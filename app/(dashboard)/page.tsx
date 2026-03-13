'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useT } from "@/components/language-provider";
import { supabaseClient } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DashboardPage() {
  const t = useT();
  const [loading, setLoading] = React.useState(true);
  const [todaySales, setTodaySales] = React.useState(0);
  const [monthSales, setMonthSales] = React.useState(0);
  const [lowStockCount, setLowStockCount] = React.useState(0);
  const [dailyTrends, setDailyTrends] = React.useState<{ label: string; total: number }[]>([]);
  const [topCategories, setTopCategories] = React.useState<{ name: string; total: number }[]>([]);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [refreshKey, setRefreshKey] = React.useState(0);

  React.useEffect(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const formatDate = (value: Date) => value.toISOString().slice(0, 10);
    setStartDate(formatDate(startOfMonth));
    setEndDate(formatDate(now));
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const rangeStart = startDate ? new Date(`${startDate}T00:00:00`) : new Date(now.getFullYear(), now.getMonth(), 1);
      const rangeEnd = endDate ? new Date(`${endDate}T23:59:59`) : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const rangeStartIso = rangeStart.toISOString();
      const rangeEndIso = rangeEnd.toISOString();

      const [ordersRes, productsRes, itemsRes] = await Promise.all([
        supabaseClient
          .from('orders')
          .select('created_at,total_amount')
          .gte('created_at', rangeStartIso)
          .lte('created_at', rangeEndIso),
        supabaseClient
          .from('products')
          .select('stock_quantity,reorder'),
        supabaseClient
          .from('order_items')
          .select('subtotal,created_at,products(category)')
          .gte('created_at', rangeStartIso)
          .lte('created_at', rangeEndIso),
      ]);

      if (!cancelled) {
        const orders = ordersRes.data || [];
        const products = productsRes.data || [];
        const items = itemsRes.data || [];

        const todayTotal = orders.reduce((sum, order) => {
          const created = new Date(order.created_at);
          if (created >= startOfToday && created < endOfToday) {
            return sum + Number(order.total_amount || 0);
          }
          return sum;
        }, 0);

        const monthTotal = orders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);

        const lowStock = products.filter((product) => {
          const stock = Number(product.stock_quantity ?? 0);
          const threshold = Number(product.reorder ?? 2);
          return stock <= threshold;
        }).length;

        const trend: { label: string; total: number }[] = [];
        const trendStart = new Date(rangeStart);
        const trendEnd = new Date(rangeEnd);
        const diffDays = Math.max(1, Math.ceil((trendEnd.getTime() - trendStart.getTime()) / (1000 * 60 * 60 * 24)));
        const startIndex = Math.max(0, diffDays - 7);
        for (let i = startIndex; i < diffDays; i += 1) {
          const day = new Date(trendStart.getFullYear(), trendStart.getMonth(), trendStart.getDate() + i);
          const nextDay = new Date(trendStart.getFullYear(), trendStart.getMonth(), trendStart.getDate() + i + 1);
          const label = day.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
          const total = orders.reduce((sum, order) => {
            const created = new Date(order.created_at);
            if (created >= day && created < nextDay) {
              return sum + Number(order.total_amount || 0);
            }
            return sum;
          }, 0);
          trend.push({ label, total });
        }

        const categoryTotals = new Map<string, number>();
        items.forEach((item: any) => {
          const category = item?.products?.category || 'Uncategorized';
          const subtotal = Number(item.subtotal || 0);
          categoryTotals.set(category, (categoryTotals.get(category) || 0) + subtotal);
        });

        const sortedCategories = Array.from(categoryTotals.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, total]) => ({ name, total }));

        setTodaySales(todayTotal);
        setMonthSales(monthTotal);
        setLowStockCount(lowStock);
        setDailyTrends(trend);
        setTopCategories(sortedCategories);
        setLoading(false);
      }
    };

    if (startDate && endDate) {
      run();
    }
    return () => {
      cancelled = true;
    };
  }, [endDate, startDate, refreshKey]);

  return (
    <div className="space-y-4">
      {/* Branding & Header */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              {t("dashboardOverview") || "Dashboard Overview"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("dashboardSubtext") || "Welcome to The More You Glow By Ingyin POS"}
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-2">
            <div className="space-y-1">
              <div className="text-[11px] font-semibold text-muted-foreground">Start</div>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-9"
              />
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-semibold text-muted-foreground">End</div>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-9"
              />
            </div>
            <Button
              className="h-9"
              onClick={() => setRefreshKey((value) => value + 1)}
              disabled={loading}
            >
              Refresh
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid gap-3 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{todaySales.toLocaleString()} MMK</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Total sales made today.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{monthSales.toLocaleString()} MMK</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Monthly total revenue.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-red-500">{lowStockCount}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Items below reorder point.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Visualizations Section */}
      <section className="grid gap-3 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Daily Sales Trends</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-border/60 bg-muted/50">
                <span className="text-sm text-muted-foreground">Loading sales trends...</span>
              </div>
            ) : (
              <div className="space-y-2">
                {dailyTrends.map((trend) => (
                  <div key={trend.label} className="flex items-center gap-3">
                    <div className="w-20 text-xs text-muted-foreground">{trend.label}</div>
                    <div className="flex-1 rounded-full bg-secondary/60 h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{
                          width: `${Math.min(
                            100,
                            dailyTrends.length > 0
                              ? (trend.total / Math.max(...dailyTrends.map((t) => t.total), 1)) * 100
                              : 0
                          )}%`,
                        }}
                      />
                    </div>
                    <div className="w-24 text-right text-xs font-semibold">
                      {trend.total.toLocaleString()} MMK
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-border/60 bg-muted/50">
                <span className="text-sm text-muted-foreground">Loading categories...</span>
              </div>
            ) : (
              <div className="space-y-2">
                {topCategories.length === 0 && (
                  <div className="text-sm text-muted-foreground">No category data yet.</div>
                )}
                {topCategories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between text-sm">
                    <span className="truncate">{category.name}</span>
                    <span className="font-semibold">{category.total.toLocaleString()} MMK</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

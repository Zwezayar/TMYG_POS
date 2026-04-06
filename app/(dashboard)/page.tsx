'use client';

import * as React from 'react';
import { BarChart3, Loader2, LockKeyhole, ShieldCheck, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useT } from "@/components/language-provider";
import { supabaseClient } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import { formatDateDDMMYYYY } from '@/lib/date';

type DeliveryPartner = {
  id: string;
  name: string;
};

type ProfitTotals = {
  revenue: number;
  cost: number;
  profit: number;
  orderCount: number;
  itemCount: number;
};

type ProfitBreakdown = {
  date: string;
  revenue: number;
  cost: number;
  profit: number;
  orders: number;
};

type PartnerSummary = {
  name: string;
  revenue: number;
  cost: number;
  profit: number;
  orders: number;
};

type ProfitResponse = {
  totals: ProfitTotals;
  breakdown: ProfitBreakdown[];
  byPartner: PartnerSummary[];
};

function getInputDate(offsetDays = 0) {
  const now = new Date();
  now.setDate(now.getDate() + offsetDays);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatCurrency(value: number) {
  return `Ks ${Number(value || 0).toLocaleString()}`;
}

export default function DashboardPage() {
  const t = useT();
  const { role } = useDashboardAuth();
  const isAdmin = role === 'admin';
  const [loading, setLoading] = React.useState(true);
  const [todaySales, setTodaySales] = React.useState(0);
  const [monthSales, setMonthSales] = React.useState(0);
  const [lowStockCount, setLowStockCount] = React.useState(0);
  const [dailyTrends, setDailyTrends] = React.useState<{ label: string; total: number }[]>([]);
  const [topCategories, setTopCategories] = React.useState<{ name: string; total: number }[]>([]);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [reportSending, setReportSending] = React.useState(false);
  const [reportStatus, setReportStatus] = React.useState<string | null>(null);
  const [profitPromptOpen, setProfitPromptOpen] = React.useState(false);
  const [profitPanelOpen, setProfitPanelOpen] = React.useState(false);
  const [profitPasscode, setProfitPasscode] = React.useState('');
  const [profitUnlocking, setProfitUnlocking] = React.useState(false);
  const [profitLoading, setProfitLoading] = React.useState(false);
  const [profitError, setProfitError] = React.useState<string | null>(null);
  const [profitData, setProfitData] = React.useState<ProfitResponse | null>(null);
  const [profitStartDate, setProfitStartDate] = React.useState(() => getInputDate(-6));
  const [profitEndDate, setProfitEndDate] = React.useState(() => getInputDate(0));
  const [profitPartner, setProfitPartner] = React.useState('');
  const [profitPartners, setProfitPartners] = React.useState<DeliveryPartner[]>([]);
  const [loadingProfitPartners, setLoadingProfitPartners] = React.useState(false);

  const maxProfit = React.useMemo(() => {
    if (!profitData?.breakdown.length) return 0;
    return Math.max(...profitData.breakdown.map((entry) => Math.abs(entry.profit)));
  }, [profitData]);

  const fetchProfitPartners = React.useCallback(async () => {
    if (!isAdmin) return;
    setLoadingProfitPartners(true);
    try {
      const res = await fetch('/api/delivery-partners');
      const result = await res.json().catch(() => []);
      if (!res.ok) {
        throw new Error(result?.error || res.statusText);
      }
      setProfitPartners((result ?? []) as DeliveryPartner[]);
    } catch (err) {
      setProfitError(
        err instanceof Error ? err.message : 'Failed to load delivery partners.'
      );
      setProfitPartners([]);
    } finally {
      setLoadingProfitPartners(false);
    }
  }, [isAdmin]);

  const fetchProfitDashboard = React.useCallback(
    async (code: string) => {
      setProfitLoading(true);
      setProfitError(null);
      try {
        const { data: sessionData } = await supabaseClient.auth.getSession();
        const token = sessionData.session?.access_token;
        if (!token) {
          throw new Error('Session expired.');
        }

        const res = await fetch('/api/admin/profit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            passcode: code,
            start_date: profitStartDate,
            end_date: profitEndDate,
            delivery_partner: profitPartner,
          }),
        });

        const result = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(result?.error || 'Failed to load profit dashboard.');
        }

        setProfitData(result as ProfitResponse);
        return true;
      } catch (err) {
        setProfitError(
          err instanceof Error ? err.message : 'Failed to load profit dashboard.'
        );
        return false;
      } finally {
        setProfitLoading(false);
      }
    },
    [profitEndDate, profitPartner, profitStartDate]
  );

  const handleUnlockProfit = React.useCallback(async () => {
    if (!profitPasscode.trim()) {
      setProfitError('Passcode is required.');
      return;
    }
    setProfitUnlocking(true);
    const ok = await fetchProfitDashboard(profitPasscode);
    if (ok) {
      setProfitPromptOpen(false);
      setProfitPanelOpen(true);
    }
    setProfitUnlocking(false);
  }, [fetchProfitDashboard, profitPasscode]);

  React.useEffect(() => {
    if (profitPromptOpen || profitPanelOpen) {
      fetchProfitPartners();
    }
  }, [fetchProfitPartners, profitPanelOpen, profitPromptOpen]);

  React.useEffect(() => {
    if (profitPanelOpen && profitPasscode) {
      fetchProfitDashboard(profitPasscode);
    }
  }, [fetchProfitDashboard, profitPanelOpen, profitPasscode, profitStartDate, profitEndDate, profitPartner]);

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
          const label = formatDateDDMMYYYY(day);
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
            {isAdmin && (
              <>
                <Button
                  variant="outline"
                  className="h-9 gap-2"
                  onClick={() => {
                    setProfitError(null);
                    setProfitPromptOpen(true);
                  }}
                >
                  <TrendingUp className="h-4 w-4" />
                  Profit Analytics
                </Button>
                <Button
                  className="h-9"
                  onClick={async () => {
                    setReportSending(true);
                    setReportStatus(null);
                    const { data } = await supabaseClient.auth.getSession();
                    const token = data.session?.access_token;
                    if (!token) {
                      setReportStatus('Session expired.');
                      setReportSending(false);
                      return;
                    }
                    const res = await fetch('/api/admin/daily-report', {
                      method: 'POST',
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });
                    const dataRes = await res.json().catch(() => ({}));
                    if (!res.ok) {
                      setReportStatus(dataRes?.error || res.statusText);
                    } else {
                      setReportStatus('Daily report sent.');
                    }
                    setReportSending(false);
                  }}
                  disabled={reportSending}
                >
                  {reportSending ? 'Sending...' : 'Send Daily Report Now'}
                </Button>
              </>
            )}
          </div>
        </div>
        {reportStatus && (
          <div className="text-xs text-muted-foreground">{reportStatus}</div>
        )}
      </section>

      {/* Stats Section */}
      <section className={`grid gap-3 ${isAdmin ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
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

        {isAdmin && (
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
        )}
      </section>

      {isAdmin && (
        <section className="grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Profit Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-medium">
                  Unlock revenue, cost, net profit, and partner performance.
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Opens a secure analytics overlay inside the dashboard for fast admin review.
                </p>
              </div>
              <Button
                className="gap-2"
                onClick={() => {
                  setProfitError(null);
                  setProfitPromptOpen(true);
                }}
              >
                <BarChart3 className="h-4 w-4" />
                Open Profit Analytics
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div>Use the Sales group for POS and bulk entry.</div>
              <div>Manage customers and delivery partners from the Management group.</div>
              <div>Keep profit data secured inside this dashboard hub.</div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Visualizations Section */}
      <section className={`grid gap-3 ${isAdmin ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
        <Card className={isAdmin ? 'md:col-span-2' : ''}>
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
        
        {isAdmin && (
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
        )}
      </section>

      {profitPromptOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => !profitUnlocking && setProfitPromptOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <LockKeyhole className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-semibold">Unlock Profit Analytics</div>
                <p className="text-sm text-muted-foreground">Enter Admin Passcode</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <Input
                type="password"
                value={profitPasscode}
                onChange={(e) => setProfitPasscode(e.target.value)}
                placeholder="Enter Admin Passcode"
                className="h-12"
              />
              {profitError && (
                <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {profitError}
                </div>
              )}
              <Button
                onClick={handleUnlockProfit}
                disabled={profitUnlocking}
                className="h-12 w-full rounded-xl text-base font-semibold"
              >
                {profitUnlocking ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Unlock Profit Analytics'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {profitPanelOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 px-4 py-4 md:px-6"
          onClick={() => setProfitPanelOpen(false)}
        >
          <div
            className="mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
              <div>
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Profit Analytics
                </div>
                <p className="text-sm text-muted-foreground">
                  Review revenue, cost, net profit, and partner performance inside the dashboard.
                </p>
              </div>
              <Button variant="outline" onClick={() => setProfitPanelOpen(false)}>
                Close
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-4 pb-6">
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <label className="space-y-2">
                      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Start Date
                      </div>
                      <Input
                        type="date"
                        value={profitStartDate}
                        max={profitEndDate}
                        onChange={(e) => setProfitStartDate(e.target.value)}
                        className="h-11"
                      />
                    </label>
                    <label className="space-y-2">
                      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        End Date
                      </div>
                      <Input
                        type="date"
                        value={profitEndDate}
                        min={profitStartDate}
                        max={getInputDate(0)}
                        onChange={(e) => setProfitEndDate(e.target.value)}
                        className="h-11"
                      />
                    </label>
                    <label className="space-y-2">
                      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Delivery Partner
                      </div>
                      <select
                        value={profitPartner}
                        onChange={(e) => setProfitPartner(e.target.value)}
                        disabled={loadingProfitPartners}
                        className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <option value="">
                          {loadingProfitPartners ? 'Loading partners...' : 'All partners'}
                        </option>
                        {profitPartners.map((partner) => (
                          <option key={partner.id} value={partner.name}>
                            {partner.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        onClick={() => fetchProfitDashboard(profitPasscode)}
                        disabled={profitLoading}
                        className="h-11 w-full rounded-xl"
                      >
                        {profitLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Refreshing...
                          </>
                        ) : (
                          'Refresh Data'
                        )}
                      </Button>
                    </div>
                  </div>

                  {profitError && (
                    <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                      {profitError}
                    </div>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Total Revenue
                    </div>
                    <div className="mt-3 text-2xl font-semibold">
                      {formatCurrency(profitData?.totals.revenue ?? 0)}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Total Cost
                    </div>
                    <div className="mt-3 text-2xl font-semibold">
                      {formatCurrency(profitData?.totals.cost ?? 0)}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Net Profit
                    </div>
                    <div
                      className={`mt-3 text-2xl font-semibold ${(profitData?.totals.profit ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}
                    >
                      {formatCurrency(profitData?.totals.profit ?? 0)}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Orders
                    </div>
                    <div className="mt-3 text-2xl font-semibold">
                      {(profitData?.totals.orderCount ?? 0).toLocaleString()}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Units Sold
                    </div>
                    <div className="mt-3 text-2xl font-semibold">
                      {(profitData?.totals.itemCount ?? 0).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-base font-semibold">Daily Profit View</div>
                        <p className="text-sm text-muted-foreground">
                          Visualize daily profit across the selected range.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-4">
                      {!profitData?.breakdown.length ? (
                        <div className="rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
                          No profit data found for the selected filters.
                        </div>
                      ) : (
                        profitData.breakdown.map((entry) => {
                          const width =
                            maxProfit > 0
                              ? `${Math.max(8, (Math.abs(entry.profit) / maxProfit) * 100)}%`
                              : '8%';
                          return (
                            <div key={entry.date} className="space-y-2">
                              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                                <div className="font-medium">{entry.date}</div>
                                <div className="text-muted-foreground">
                                  Revenue {formatCurrency(entry.revenue)} • Cost {formatCurrency(entry.cost)} • {entry.orders} orders
                                </div>
                              </div>
                              <div className="h-3 overflow-hidden rounded-full bg-secondary">
                                <div
                                  className={`h-full rounded-full ${entry.profit >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                                  style={{ width }}
                                />
                              </div>
                              <div
                                className={`text-sm font-semibold ${entry.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}
                              >
                                Profit {formatCurrency(entry.profit)}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-base font-semibold">Profit by Partner</div>
                          <p className="text-sm text-muted-foreground">
                            Compare delivery partners against shop sales.
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        {!profitData?.byPartner.length ? (
                          <div className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
                            No partner summary available.
                          </div>
                        ) : (
                          profitData.byPartner.map((partner) => (
                            <div
                              key={partner.name}
                              className="rounded-2xl border border-border/60 bg-background p-4"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div className="font-semibold">{partner.name}</div>
                                <div
                                  className={`text-sm font-semibold ${partner.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}
                                >
                                  {formatCurrency(partner.profit)}
                                </div>
                              </div>
                              <div className="mt-2 text-xs text-muted-foreground">
                                Revenue {formatCurrency(partner.revenue)} • Cost {formatCurrency(partner.cost)} • {partner.orders} orders
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

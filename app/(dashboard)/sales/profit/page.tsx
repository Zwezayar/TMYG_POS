'use client';

import * as React from 'react';
import { BarChart3, Loader2, LockKeyhole, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDashboardAuth } from '@/lib/dashboard-auth-context';
import { supabaseClient } from '@/lib/supabaseClient';

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

export default function ProfitDashboardPage() {
  const { role } = useDashboardAuth();
  const skipNextAutoFetchRef = React.useRef(false);
  const [passcode, setPasscode] = React.useState('');
  const [unlocking, setUnlocking] = React.useState(false);
  const [unlocked, setUnlocked] = React.useState(false);
  const [startDate, setStartDate] = React.useState(() => getInputDate(-6));
  const [endDate, setEndDate] = React.useState(() => getInputDate(0));
  const [deliveryPartner, setDeliveryPartner] = React.useState('');
  const [deliveryPartners, setDeliveryPartners] = React.useState<DeliveryPartner[]>([]);
  const [loadingPartners, setLoadingPartners] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<ProfitResponse | null>(null);

  const fetchPartners = React.useCallback(async () => {
    setLoadingPartners(true);
    try {
      const res = await fetch('/api/delivery-partners');
      const result = await res.json().catch(() => []);
      if (!res.ok) {
        throw new Error(result?.error || res.statusText);
      }
      setDeliveryPartners((result ?? []) as DeliveryPartner[]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load delivery partners.'
      );
      setDeliveryPartners([]);
    } finally {
      setLoadingPartners(false);
    }
  }, []);

  React.useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  const fetchDashboard = React.useCallback(
    async (code: string) => {
      setLoading(true);
      setError(null);
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
            start_date: startDate,
            end_date: endDate,
            delivery_partner: deliveryPartner,
          }),
        });

        const result = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(result?.error || 'Failed to load profit dashboard.');
        }

        setData(result as ProfitResponse);
        return true;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load profit dashboard.'
        );
        if (code !== passcode) {
          setPasscode(code);
        }
        return false;
      } finally {
        setLoading(false);
      }
    },
    [deliveryPartner, endDate, passcode, startDate]
  );

  const handleUnlock = async () => {
    if (!passcode.trim()) {
      setError('Passcode is required.');
      return;
    }
    setUnlocking(true);
    const ok = await fetchDashboard(passcode);
    if (ok) {
      skipNextAutoFetchRef.current = true;
      setUnlocked(true);
    }
    setUnlocking(false);
  };

  React.useEffect(() => {
    if (unlocked) {
      if (skipNextAutoFetchRef.current) {
        skipNextAutoFetchRef.current = false;
        return;
      }
      fetchDashboard(passcode);
    }
  }, [deliveryPartner, endDate, fetchDashboard, passcode, startDate, unlocked]);

  const maxProfit = React.useMemo(() => {
    if (!data?.breakdown.length) return 0;
    return Math.max(...data.breakdown.map((entry) => Math.abs(entry.profit)));
  }, [data]);

  if (!role) {
    return (
      <div className="space-y-3">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Profit Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Access restricted. Please sign in to continue.
        </p>
      </div>
    );
  }

  if (role !== 'admin') {
    return (
      <div className="space-y-3">
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Profit Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Access restricted. This page is for admins only.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Profit Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Review revenue, cost, and net profit with an extra passcode layer.
        </p>
      </div>

      {!unlocked ? (
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <LockKeyhole className="h-6 w-6" />
            </div>
            <div>
              <div className="text-lg font-semibold">Unlock dashboard</div>
              <p className="text-sm text-muted-foreground">
                Enter the admin passcode to load profit data.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <Input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode"
              className="h-12"
            />
            <div className="text-xs text-muted-foreground">
              Default passcode: 1234
            </div>
            {error && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}
            <Button
              onClick={handleUnlock}
              disabled={unlocking}
              className="h-12 w-full rounded-xl text-base font-semibold"
            >
              {unlocking ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Unlock Profit Dashboard'
              )}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <label className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Start Date
                </div>
                <Input
                  type="date"
                  value={startDate}
                  max={endDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-11"
                />
              </label>
              <label className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  End Date
                </div>
                <Input
                  type="date"
                  value={endDate}
                  min={startDate}
                  max={getInputDate(0)}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-11"
                />
              </label>
              <label className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Delivery Partner
                </div>
                <select
                  value={deliveryPartner}
                  onChange={(e) => setDeliveryPartner(e.target.value)}
                  disabled={loadingPartners}
                  className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="">
                    {loadingPartners ? 'Loading partners...' : 'All partners'}
                  </option>
                  {deliveryPartners.map((partner) => (
                    <option key={partner.id} value={partner.name}>
                      {partner.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => fetchDashboard(passcode)}
                  disabled={loading}
                  className="h-11 w-full rounded-xl"
                >
                  {loading ? (
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

            {error && (
              <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Total Revenue
              </div>
              <div className="mt-3 text-2xl font-semibold">
                {formatCurrency(data?.totals.revenue ?? 0)}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Total Cost
              </div>
              <div className="mt-3 text-2xl font-semibold">
                {formatCurrency(data?.totals.cost ?? 0)}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Net Profit
              </div>
              <div
                className={`mt-3 text-2xl font-semibold ${(data?.totals.profit ?? 0) >= 0
                  ? 'text-emerald-400'
                  : 'text-rose-400'
                  }`}
              >
                {formatCurrency(data?.totals.profit ?? 0)}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Orders
              </div>
              <div className="mt-3 text-2xl font-semibold">
                {(data?.totals.orderCount ?? 0).toLocaleString()}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Units Sold
              </div>
              <div className="mt-3 text-2xl font-semibold">
                {(data?.totals.itemCount ?? 0).toLocaleString()}
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
                {!data?.breakdown.length ? (
                  <div className="rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
                    No profit data found for the selected filters.
                  </div>
                ) : (
                  data.breakdown.map((entry) => {
                    const width =
                      maxProfit > 0
                        ? `${Math.max(
                          8,
                          (Math.abs(entry.profit) / maxProfit) * 100
                        )}%`
                        : '8%';
                    return (
                      <div key={entry.date} className="space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                          <div className="font-medium">{entry.date}</div>
                          <div className="text-muted-foreground">
                            Revenue {formatCurrency(entry.revenue)} • Cost{' '}
                            {formatCurrency(entry.cost)} • {entry.orders} orders
                          </div>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-secondary">
                          <div
                            className={`h-full rounded-full ${entry.profit >= 0 ? 'bg-emerald-500' : 'bg-rose-500'
                              }`}
                            style={{ width }}
                          />
                        </div>
                        <div
                          className={`text-sm font-semibold ${entry.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                            }`}
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
                  {!data?.byPartner.length ? (
                    <div className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
                      No partner summary available.
                    </div>
                  ) : (
                    data.byPartner.map((partner) => (
                      <div
                        key={partner.name}
                        className="rounded-2xl border border-border/60 bg-background p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="font-semibold">{partner.name}</div>
                          <div
                            className={`text-sm font-semibold ${partner.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                              }`}
                          >
                            {formatCurrency(partner.profit)}
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          Revenue {formatCurrency(partner.revenue)} • Cost{' '}
                          {formatCurrency(partner.cost)} • {partner.orders} orders
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

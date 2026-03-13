'use client';

import * as React from 'react';

export type Role = 'admin' | 'staff';

export interface DashboardAuthValue {
  role: Role | null;
  username: string | null;
}

const DashboardAuthContext = React.createContext<DashboardAuthValue>({
  role: null,
  username: null,
});

export function useDashboardAuth(): DashboardAuthValue {
  const ctx = React.useContext(DashboardAuthContext);
  if (!ctx) {
    return { role: null, username: null };
  }
  return ctx;
}

export function DashboardAuthProvider({
  value,
  children,
}: {
  value: DashboardAuthValue;
  children: React.ReactNode;
}) {
  return (
    <DashboardAuthContext.Provider value={value}>
      {children}
    </DashboardAuthContext.Provider>
  );
}

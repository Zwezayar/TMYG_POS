'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

export default function InventoryPage() {
  const router = useRouter();

  React.useEffect(() => {
    router.replace('/admin/inventory');
  }, [router]);

  return (
    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
      Redirecting to Inventory Management...
    </div>
  );
}

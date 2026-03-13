'use client';

import * as React from 'react';
import { supabaseClient } from '@/lib/supabaseClient';

export interface Product {
  id: number;
  product_name: string | null;
  default_code: string | null;
  barcode: string | null;
  image_url: string | null;
  category: string | null;
  size?: string | null;
  variant: string | null;
  purchase_price: number | null;
  sale_price: number | null;
  stock_quantity: number | null;
  description_en: string | null;
  description_mm: string | null;
  reorder: number | null;
  remark: string | null;
  created_at: string | null;
}

export function useProducts() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchProducts = React.useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabaseClient
      .from('products')
      .select(
        `
        id,
        product_name,
        default_code,
        barcode,
        image_url,
        category,
        size,
        variant,
        purchase_price,
        sale_price,
        stock_quantity,
        description_en,
        description_mm,
        reorder,
        remark,
        created_at
      `
      )
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setProducts((data ?? []) as Product[]);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    fetchProducts();

    const channel = supabaseClient
      .channel('products-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products',
        },
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [fetchProducts]);

  return { products, loading, error, refresh: fetchProducts };
}

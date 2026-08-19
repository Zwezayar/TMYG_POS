export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'newest';

export const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price-asc', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
  { value: 'newest', label: 'Newest' },
];

export function sortProducts<
  T extends {
    product_name?: string | null;
    sale_price?: number | null;
    created_at?: string | null;
  }
>(products: T[], option: SortOption): T[] {
  const sorted = [...products];

  switch (option) {
    case 'name-asc':
      sorted.sort((a, b) =>
        (a.product_name ?? '').localeCompare(b.product_name ?? '', undefined, {
          sensitivity: 'base',
        })
      );
      break;
    case 'name-desc':
      sorted.sort((a, b) =>
        (b.product_name ?? '').localeCompare(a.product_name ?? '', undefined, {
          sensitivity: 'base',
        })
      );
      break;
    case 'price-asc':
      sorted.sort((a, b) => (a.sale_price ?? 0) - (b.sale_price ?? 0));
      break;
    case 'price-desc':
      sorted.sort((a, b) => (b.sale_price ?? 0) - (a.sale_price ?? 0));
      break;
    case 'newest':
      sorted.sort((a, b) => {
        const aTime = a.created_at ? Date.parse(a.created_at) : 0;
        const bTime = b.created_at ? Date.parse(b.created_at) : 0;
        return bTime - aTime;
      });
      break;
  }

  return sorted;
}

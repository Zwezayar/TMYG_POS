export type SearchProductLike = {
  product_name?: string | null;
  category?: string | null;
  barcode?: string | null;
  default_code?: string | null;
  size?: string | null;
  variant?: string | null;
  sale_price?: number | null;
  created_at?: string | null;
};

/**
 * Normalize any raw string to a standardized searchable form:
 * - Unicode NFD (strip diacritics)
 * - camelCase → "camel case"
 * - all non-alphanum → single space
 * - lowercased + trimmed
 */
export function normalizeSearchValue(value: string | null | undefined): string {
  return (value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .toLowerCase()
    .trim();
}

const NORM_CACHE = new WeakMap<object, Record<string, string>>();

function getNormalizedFields<T extends SearchProductLike>(product: T): {
  nameNorm: string;
  fieldsNorm: string[];
  fieldsCompact: string[];
} {
  let cached = NORM_CACHE.get(product);
  if (!cached) {
    const name = normalizeSearchValue(product.product_name);
    const fields = [
      product.product_name,
      product.category,
      product.barcode,
      product.default_code,
      product.size,
      product.variant,
    ]
      .map((f) => normalizeSearchValue(f))
      .filter(Boolean);
    cached = {
      name,
      fields: fields.join(' \x01 '),
    };
    NORM_CACHE.set(product, cached as Record<string, string>);
  }
  return {
    nameNorm: (cached as Record<string, string>).name,
    fieldsNorm: (cached as Record<string, string>).fields.split(' \x01 '),
    fieldsCompact: (cached as Record<string, string>).fields
      .split(' \x01 ')
      .map((f) => f.replace(/\s+/g, '')),
  };
}

type MatchRank = 0 | 1 | 2 | 3;
const RANK_NO_MATCH: MatchRank = 0;
const RANK_BARCODE_EXACT: MatchRank = 1;
const RANK_NAME_STARTS_WITH: MatchRank = 2;
const RANK_ANY_INCLUDES: MatchRank = 3;

/**
 * Returns how well a product matches a search query (rank).
 * 0 = no match, 1 = exact normalized barcode match, 2 = product_name starts with query, 3 = any field includes.
 *
 * All comparisons use normalized values (accent/case/punctuation insensitive).
 * If query is empty every product matches at rank 0 — but callers should use
 * the NOOP fast-path and not apply any ranking when query is blank.
 */
export function rankSearchMatch<T extends SearchProductLike>(
  product: T,
  rawQuery: string
): MatchRank {
  const query = rawQuery.trim();
  if (!query) return RANK_NO_MATCH;
  const q = normalizeSearchValue(query);
  if (!q) return RANK_NO_MATCH;

  const compactQ = q.replace(/\s+/g, '');

  const primaryBarcodeRaw =
    (product as unknown as { primary_barcode?: string | null }).primary_barcode ??
    product.barcode;
  const primaryNorm = normalizeSearchValue(primaryBarcodeRaw);
  if (primaryNorm && (primaryNorm === q || primaryNorm.replace(/\s+/g, '') === compactQ)) {
    return RANK_BARCODE_EXACT;
  }

  const barcodesArr = (product as unknown as { barcodes?: unknown }).barcodes;
  if (Array.isArray(barcodesArr)) {
    for (const code of barcodesArr) {
      if (typeof code !== 'string' && typeof code !== 'number') continue;
      const altNorm = normalizeSearchValue(String(code));
      if (altNorm && (altNorm === q || altNorm.replace(/\s+/g, '') === compactQ)) {
        return RANK_BARCODE_EXACT;
      }
    }
  }

  const { nameNorm, fieldsNorm, fieldsCompact } = getNormalizedFields(product);

  if (nameNorm && (nameNorm.startsWith(q) || nameNorm.replace(/\s+/g, '').startsWith(compactQ))) {
    return RANK_NAME_STARTS_WITH;
  }

  const allFields = fieldsNorm;
  const allCompact = fieldsCompact;
  const queryParts = q.split(' ').filter(Boolean);

  const anyFieldIncludes =
    allFields.some((f) => f.includes(q)) ||
    allCompact.some((f) => f.includes(compactQ)) ||
    (queryParts.length > 0 &&
      allFields.some((f) =>
        queryParts.every((part) => f.includes(part) || f.replace(/\s+/g, '').includes(part))
      ));

  return anyFieldIncludes ? RANK_ANY_INCLUDES : RANK_NO_MATCH;
}

/**
 * Boolean predicate — existing productMatchesSearch contract, re-implemented using
 * the same normalization as rankSearchMatch. Use this for scanner/quick-add
 * flows where you only want a YES/NO match (no ranking).
 */
export function productMatchesQuery<T extends SearchProductLike>(
  product: T,
  rawQuery: string
): boolean {
  const q = rawQuery.trim();
  if (!q) return true;
  return rankSearchMatch(product, q) !== RANK_NO_MATCH;
}

/**
 * Filter list to only matching products, sorted by rank priority:
 *   1. exact normalized barcode match
 *   2. product_name STARTS WITH the query (prefix match)
 *   3. any searchable field INCLUDES the query (substring match)
 *
 * When `query` is blank/empty: returns the list unchanged (no filter, no reorder).
 * When `query` is set, the result list is ranked (exact barcode matches always come first, then startsWith).
 * Ties within a rank bucket are resolved by preserving original input order
 * (stable via the `ranked.sort` and a captured index).
 */
export function filterAndPrioritizeByQuery<T extends SearchProductLike>(
  list: T[],
  rawQuery: string
): T[] {
  const query = rawQuery.trim();
  if (!query) return list;

  const ranked: Array<{ rank: MatchRank; index: number; item: T }> = [];
  for (let i = 0; i < list.length; i++) {
    const rank = rankSearchMatch(list[i], query);
    if (rank !== RANK_NO_MATCH) {
      ranked.push({ rank, index: i, item: list[i] });
    }
  }

  ranked.sort((a, b) => {
    if (a.rank !== b.rank) return a.rank - b.rank;
    return a.index - b.index;
  });

  return ranked.map((r) => r.item);
}

/**
 * Combined pipeline helper:
 *   1. Filter + rank by barcode-exact / prefix / includes priority
 *   2. Within each rank bucket, apply user's requested sort option (A-Z / price etc.)
 *
 * This is the recommended entry point for all product list useMemos. The search
 * query filter happens BEFORE the user-facing sort, so the chosen sort still
 * controls ordering — but exact barcode matches always surface to the very top,
 * followed by prefix matches (startsWith), regardless of the user sort choice.
 */
export function applySearchThenSort<T extends SearchProductLike>(
  list: T[],
  rawQuery: string,
  sortOption: SortOption
): T[] {
  const query = rawQuery.trim();
  if (!query) {
    return sortProducts(list, sortOption);
  }

  const rankMap = new Map<T, MatchRank>();
  const filtered: T[] = [];
  for (let i = 0; i < list.length; i++) {
    const rank = rankSearchMatch(list[i], query);
    if (rank !== RANK_NO_MATCH) {
      rankMap.set(list[i], rank);
      filtered.push(list[i]);
    }
  }

  const byOption = sortProducts(filtered, sortOption);
  byOption.sort((a, b) => {
    const ra = rankMap.get(a) ?? RANK_ANY_INCLUDES;
    const rb = rankMap.get(b) ?? RANK_ANY_INCLUDES;
    if (ra !== rb) return ra - rb;
    return 0;
  });

  return byOption;
}

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

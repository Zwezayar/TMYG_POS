export const CATEGORY_HIERARCHY: Record<string, string[]> = {
  Skincare: [
    'Cleansers',
    'Toners',
    'Serums',
    'Moisturizers',
    'Sunscreens',
    'Eye Care',
    'Face Masks',
  ],
  Makeup: [
    'Foundations',
    'Concealers',
    'Lipsticks',
    'Mascaras',
    'Eyeliners',
    'Palettes',
    'Setting Sprays',
  ],
  'Bath & Body': [
    'Body Lotions',
    'Body Wash',
    'Hand Creams',
    'Deodorants',
    'Haircare',
  ],
};

const subToParent = new Map<string, string>(
  Object.entries(CATEGORY_HIERARCHY).flatMap(([parent, subs]) =>
    subs.map((sub) => [sub.toLowerCase(), parent])
  )
);

export function getParentForSubCategory(sub: string | null | undefined) {
  if (!sub) return null;
  return subToParent.get(sub.trim().toLowerCase()) ?? null;
}

export function getCategoryLabelFromSubCategory(sub: string | null | undefined) {
  if (!sub) return null;
  if (sub.includes('/')) return sub.split('/').map((s) => s.trim()).filter(Boolean).join(' / ');
  const parent = getParentForSubCategory(sub);
  if (!parent) return sub.trim();
  return `${parent} / ${sub.trim()}`;
}

export function getSubCategoryFromCategory(category: string | null | undefined) {
  if (!category) return null;
  const parts = category.split('/').map((s) => s.trim()).filter(Boolean);
  if (parts.length <= 1) return null;
  return parts.slice(1).join(' / ');
}

export function getAllSubCategories() {
  return Object.values(CATEGORY_HIERARCHY).flat();
}

export function getAllCategoryLabels() {
  return Object.entries(CATEGORY_HIERARCHY).flatMap(([parent, subs]) =>
    subs.map((sub) => `${parent} / ${sub}`)
  );
}

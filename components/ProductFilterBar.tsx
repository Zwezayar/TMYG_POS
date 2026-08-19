import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SORT_OPTIONS, type SortOption } from '@/lib/sortProducts';

interface ProductFilterBarProps {
  categories: Array<{ id: string; name: string }>;
  activeCategory: string | null;
  onCategoryChange: (id: string | null) => void;
  sortOption: SortOption;
  onSortChange: (opt: SortOption) => void;
  className?: string;
}

export function ProductFilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  className,
}: ProductFilterBarProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <div className="flex gap-2 overflow-x-auto">
          <Button
            variant="outline"
            onClick={() => onCategoryChange(null)}
            className={cn(
              'h-9 rounded-full px-4 text-xs font-bold whitespace-nowrap',
              activeCategory === null
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800'
            )}
          >
            All Products
          </Button>
          {categories.map((cat) => {
            const label = cat.name.split('/').pop()?.trim() || cat.name;
            return (
              <Button
                key={cat.id}
                variant="outline"
                onClick={() => onCategoryChange(activeCategory === cat.id ? null : cat.id)}
                className={cn(
                  'h-9 rounded-full px-4 text-xs font-bold whitespace-nowrap',
                  activeCategory === cat.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-slate-800 text-slate-900 hover:bg-slate-100 dark:border-slate-400 dark:text-slate-100 dark:hover:bg-slate-800'
                )}
              >
                {label}
              </Button>
            );
          })}
        </div>

        <div className="relative shrink-0">
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className={cn(
              'appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.25rem_1.25rem]',
              'h-9 rounded-full pl-3 pr-8 text-xs font-bold border border-border bg-background'
            )}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </div>
  );
}

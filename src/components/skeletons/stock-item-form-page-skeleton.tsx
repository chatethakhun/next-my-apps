import { Skeleton } from "@/components/skeleton";
import { StockItemFormSkeleton } from "@/components/skeletons/stock-item-form-skeleton";

export function StockItemFormPageSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>

      <div className="space-y-3">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-8 w-56 max-w-full" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>

      <StockItemFormSkeleton />
    </div>
  );
}

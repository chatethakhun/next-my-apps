import { Skeleton } from "@/components/skeleton";

export function StockItemFormPageSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>

      <div className="space-y-3">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-8 w-56 max-w-full" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-10 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

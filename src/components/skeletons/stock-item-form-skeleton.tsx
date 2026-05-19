import { Skeleton } from "@/components/skeleton";

export function StockItemFormSkeleton() {
  return (
    <div
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading form…</span>
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Skeleton className="h-10 w-28 rounded-lg" />
        <Skeleton className="h-10 w-20 rounded-lg" />
      </div>
    </div>
  );
}

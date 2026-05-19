import { Skeleton } from "@/components/skeleton";

function ListItemSkeleton() {
  return (
    <li className="flex items-start justify-between gap-4 px-4 py-3">
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-36 max-w-full" />
        <Skeleton className="h-3 w-52 max-w-full" />
      </div>
      <Skeleton className="h-8 w-14 shrink-0 rounded-lg" />
    </li>
  );
}

export function StockItemsListSkeleton() {
  return (
    <section aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading items…</span>
      <Skeleton className="mb-3 h-6 w-28" />
      <ul className="divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950">
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
      </ul>
    </section>
  );
}

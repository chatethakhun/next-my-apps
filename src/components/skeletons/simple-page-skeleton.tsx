import { Skeleton } from "@/components/skeleton";

export function SimplePageSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <Skeleton className="h-8 w-48 max-w-full" />
      <Skeleton className="h-4 w-full max-w-md" />
      <div className="mt-6 space-y-3">
        <Skeleton className="h-20 w-full rounded-2xl" />
        <Skeleton className="h-20 w-full rounded-2xl" />
      </div>
    </div>
  );
}

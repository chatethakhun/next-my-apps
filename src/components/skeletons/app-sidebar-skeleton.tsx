import { Skeleton } from "@/components/skeleton";

export function AppSidebarSkeleton() {
  return (
    <aside
      className="flex min-h-full w-64 flex-col gap-2 bg-base-200 p-4"
      aria-busy="true"
      aria-hidden
    >
      <Skeleton className="mb-4 h-7 w-32" />
      <Skeleton className="h-10 w-full rounded-lg" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </aside>
  );
}

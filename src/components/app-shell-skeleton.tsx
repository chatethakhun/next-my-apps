import { Skeleton } from "@/components/skeleton";
import { appMenuItems } from "@/lib/app-menu";

function SidebarSkeleton() {
  return (
    <aside className="flex h-full min-h-full w-72 flex-col bg-base-200">
      <div className="space-y-2 border-b border-base-300 px-4 py-5">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>

      <nav className="flex-1 space-y-2 p-3" aria-hidden>
        {appMenuItems.map((item) => (
          <div
            key={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-3"
          >
            <Skeleton className="size-5 shrink-0 rounded-md" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-36 max-w-full" />
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function NavSkeleton() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-lg lg:hidden" />
          <Skeleton className="h-4 w-24 lg:hidden" />
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <Skeleton className="hidden size-9 rounded-full sm:block" />
          <Skeleton className="h-9 w-20 rounded-full sm:h-10 sm:w-24" />
        </div>
      </div>
    </header>
  );
}

function ContentSkeleton() {
  return (
    <div className="space-y-4" aria-hidden>
      <Skeleton className="h-8 w-48 max-w-full" />
      <Skeleton className="h-4 w-full max-w-md" />
      <Skeleton className="h-4 w-64 max-w-full" />
      <div className="mt-8 space-y-3">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>
    </div>
  );
}

export function AppShellSkeleton() {
  return (
    <div
      className="drawer lg:drawer-open min-h-full flex-1"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading…</span>

      <div className="drawer-content flex min-h-full flex-col bg-zinc-50 dark:bg-black">
        <NavSkeleton />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-4xl">
            <ContentSkeleton />
          </div>
        </main>
      </div>

      <div className="drawer-side z-40">
        <SidebarSkeleton />
      </div>
    </div>
  );
}

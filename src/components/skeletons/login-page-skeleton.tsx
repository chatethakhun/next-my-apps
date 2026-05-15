import { Skeleton } from "@/components/skeleton";

export function LoginPageSkeleton() {
  return (
    <div
      className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading…</span>
      <main className="w-full max-w-md space-y-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-full max-w-xs" />
        <Skeleton className="h-12 w-full rounded-full" />
      </main>
    </div>
  );
}

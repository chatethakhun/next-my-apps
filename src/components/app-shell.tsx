"use client";

import { AppNav } from "@/components/app-nav";
import { AppSidebar } from "@/components/app-sidebar";
import { appDrawerId } from "@/lib/app-menu";

type AppShellProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  children: React.ReactNode;
};

export function AppShell({ user, children }: AppShellProps) {
  return (
    <div className="drawer lg:drawer-open min-h-full flex-1">
      <input
        id={appDrawerId}
        type="checkbox"
        className="drawer-toggle"
        aria-hidden
      />

      <div className="drawer-content flex min-h-full flex-col bg-zinc-50 dark:bg-black">
        <AppNav user={user} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-4xl">{children}</div>
        </main>
      </div>

      <div className="drawer-side z-40">
        <label
          htmlFor={appDrawerId}
          aria-label="Close menu"
          className="drawer-overlay"
        />
        <AppSidebar />
      </div>
    </div>
  );
}

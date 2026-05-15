"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { appDrawerId, appMenuItems } from "@/lib/app-menu";

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

function CalculatorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8M8 10h2M12 10h2M16 10h0M8 14h2M12 14h2M16 14h0M8 18h2M12 18h2M16 18h0" />
    </svg>
  );
}

const menuIcons: Record<string, React.ReactNode> = {
  "/app/stock-items": <MenuIcon className="size-5" />,
  "/app/calculator": <CalculatorIcon className="size-5" />,
};

export function AppSidebar() {
  const pathname = usePathname();

  useEffect(() => {
    const drawer = document.getElementById(appDrawerId) as HTMLInputElement | null;
    if (drawer) drawer.checked = false;
  }, [pathname]);

  return (
    <aside className="flex h-full min-h-full w-72 flex-col bg-base-200 text-base-content">
      <div className="border-b border-base-300 px-4 py-5">
        <p className="text-lg font-semibold">Stock Items</p>
        <p className="text-sm opacity-70">Apps</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-3" aria-label="App menu">
        <ul className="menu menu-lg w-full gap-1 p-0">
          {appMenuItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={isActive ? "active font-medium" : undefined}
                  aria-current={isActive ? "page" : undefined}
                >
                  {menuIcons[item.href]}
                  <span className="flex flex-col items-start gap-0.5">
                    <span>{item.label}</span>
                    <span className="text-xs font-normal opacity-60">
                      {item.description}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

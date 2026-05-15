import Image from "next/image";

import { signOutAction } from "@/actions/auth/actions";
import { appDrawerId } from "@/lib/app-menu";
import { LogOutIcon, MenuIcon } from "lucide-react";

type AppNavProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

function HamburgerIcon() {
  return <MenuIcon className="size-6" />;
}

export function AppNav({ user }: AppNavProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <label
            htmlFor={appDrawerId}
            className="btn btn-square btn-ghost lg:hidden"
            aria-label="Open menu"
          >
            <HamburgerIcon />
          </label>
          <div className="min-w-0 lg:hidden">
            <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Stock Items
            </p>
          </div>
        </div>

        <form
          action={signOutAction}
          className="flex shrink-0 items-center gap-3 sm:gap-4"
        >
          <div className="avatar hidden sm:block">
            <div className="w-9 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
              <Image
                src={
                  user.image ??
                  "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                }
                alt={user.name ?? "User"}
                width={36}
                height={36}
                className="rounded-full"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-outline btn-error btn-sm sm:btn-md"
          >
            <LogOutIcon className="w-4 h-4" />
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}

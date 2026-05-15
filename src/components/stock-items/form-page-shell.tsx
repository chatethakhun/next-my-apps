import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
type StockItemFormPageShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function StockItemFormPageShell({
  title,
  description,
  children,
}: StockItemFormPageShellProps) {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/app/stock-items"
          className="btn btn-ghost btn-sm -ml-2 gap-1 px-2"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to items
        </Link>
        <h1 className="mt-3 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

import Link from "next/link";

export default function EditStockItemNotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Item not found
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        This stock item does not exist or was removed.
      </p>
      <Link href="/app/stock-items" className="btn btn-primary">
        Back to items
      </Link>
    </div>
  );
}

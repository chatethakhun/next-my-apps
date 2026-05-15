import Link from "next/link";

import { getStockItems } from "@/actions/stock-items/actions";
import { StockItemsPageHeader } from "@/components/stock-items/page-header";
import { StockItemsList } from "@/components/stock-items/stock-items-list";

export default async function StockItemsPage() {
  const items = await getStockItems();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <StockItemsPageHeader />
        <Link href="/app/stock-items/new" className="btn btn-primary shrink-0">
          Add item
        </Link>
      </div>

      {items.length > 0 ? (
        <StockItemsList items={items} />
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center dark:border-zinc-700 dark:bg-zinc-950">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            No items yet. Add your first stock item.
          </p>
          <Link href="/app/stock-items/new" className="btn btn-primary btn-sm mt-4">
            Add item
          </Link>
        </div>
      )}
    </div>
  );
}

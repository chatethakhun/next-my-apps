import { getStockItems } from "@/actions/stock-items/actions";

export default async function StockItemsPage() {
  const stockItems = await getStockItems();
  console.log({ stockItems });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Stock Items
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Manage your household stock here.
      </p>
    </div>
  );
}

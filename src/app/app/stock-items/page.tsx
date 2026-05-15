import { getStockItems } from "@/actions/stock-items/actions";
import { StockItemForm } from "@/components/stock-items/form";
import { StockItemsPageHeader } from "@/components/stock-items/page-header";
import {
  StockItemsList,
  type StockItemRecord,
} from "@/components/stock-items/stock-items-list";

export default async function StockItemsPage() {
  const stockItems = await getStockItems();
  const items = Array.isArray(stockItems)
    ? (stockItems as StockItemRecord[])
    : [];

  return (
    <div className="space-y-8">
      <StockItemsPageHeader />
      <StockItemForm />
      <StockItemsList items={items} />
    </div>
  );
}

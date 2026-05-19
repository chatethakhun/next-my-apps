import { StockItemForm } from "@/components/stock-items/lazy";
import { StockItemFormPageShell } from "@/components/stock-items/form-page-shell";

export default function NewStockItemPage() {
  return (
    <StockItemFormPageShell
      title="Add stock item"
      description="Fields are validated as you type."
    >
      <StockItemForm mode="create" />
    </StockItemFormPageShell>
  );
}

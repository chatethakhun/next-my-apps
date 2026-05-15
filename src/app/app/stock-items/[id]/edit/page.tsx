import { notFound } from "next/navigation";

import { getStockItemById } from "@/actions/stock-items/actions";
import { StockItemForm } from "@/components/stock-items/form";
import { StockItemFormPageShell } from "@/components/stock-items/form-page-shell";
import { toStockItemFormValues } from "@/lib/stock-items/types";

type EditStockItemPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditStockItemPage({ params }: EditStockItemPageProps) {
  const { id } = await params;
  const item = await getStockItemById(id);

  if (!item) {
    notFound();
  }

  return (
    <StockItemFormPageShell
      title="Edit stock item"
      description={`Update details for ${item.name}.`}
    >
      <StockItemForm
        mode="edit"
        itemId={item.id}
        defaultValues={toStockItemFormValues(item)}
      />
    </StockItemFormPageShell>
  );
}

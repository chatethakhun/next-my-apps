import { notFound } from "next/navigation";

import { getStockItemById } from "@/actions/stock-items/actions";
import {
  DeleteStockItemButton,
  StockItemForm,
} from "@/components/stock-items/lazy";
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
      <div className="border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
          Remove this item from your stock list.
        </p>
        <DeleteStockItemButton id={item.id} name={item.name} size="md" />
      </div>
    </StockItemFormPageShell>
  );
}

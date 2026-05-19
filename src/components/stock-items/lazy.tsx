import dynamic from "next/dynamic";

import { StockItemFormSkeleton } from "@/components/skeletons/stock-item-form-skeleton";
import { StockItemsListSkeleton } from "@/components/skeletons/stock-items-list-skeleton";

export const StockItemForm = dynamic(
  () => import("./form").then((mod) => mod.StockItemForm),
  { loading: () => <StockItemFormSkeleton /> },
);

export const StockItemsList = dynamic(
  () => import("./stock-items-list").then((mod) => mod.StockItemsList),
  { loading: () => <StockItemsListSkeleton /> },
);

export const StockItemsPageHeader = dynamic(() =>
  import("./page-header").then((mod) => mod.StockItemsPageHeader),
);

export const DeleteStockItemButton = dynamic(() =>
  import("./delete-stock-item-button").then((mod) => mod.DeleteStockItemButton),
);

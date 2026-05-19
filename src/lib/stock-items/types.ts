import type { StockItemFormValues } from "@/lib/stock-items/schema";

export type StockItem = {
  id: string;
  name: string;
  price: number | null;
  unit: string;
  brand: string;
  quantity: number;
  createdAt?: string;
  ownerEmail: string;
};

export function isStockItem(value: unknown): value is StockItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    (typeof item.id === "string" || typeof item.id === "number") &&
    typeof item.name === "string"
  );
}

export function toStockItemFormValues(
  item: Pick<StockItem, "name" | "price" | "unit" | "brand" | "quantity">,
): StockItemFormValues {
  return {
    name: item.name,
    price: item.price != null ? String(item.price) : "",
    unit: item.unit,
    brand: item.brand,
    quantity: String(item.quantity),
  };
}

export function normalizeStockItem(value: unknown): StockItem | null {
  if (!value || typeof value !== "object") return null;

  const item = value as Record<string, unknown>;
  const id = item.id;

  if (id === undefined || id === null) return null;

  return {
    id: String(id),
    name: String(item.name ?? ""),
    price:
      item.price === null || item.price === undefined || item.price === ""
        ? null
        : Number(item.price),
    unit: String(item.unit ?? ""),
    brand: String(item.brand ?? ""),
    quantity: Number(item.quantity ?? 0),
    createdAt: typeof item.createdAt === "string" ? item.createdAt : undefined,
    ownerEmail: String(item.ownerEmail ?? ""),
  };
}

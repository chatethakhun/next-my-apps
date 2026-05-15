"use server";

import { revalidatePath } from "next/cache";

import {
  stockItemFormSchema,
  toStockItemPayload,
  type StockItemFormValues,
} from "@/lib/stock-items/schema";
import { normalizeStockItem, type StockItem } from "@/lib/stock-items/types";

export type StockItemActionResult =
  | { success: true }
  | { success: false; error: string };

function getBaseUrl() {
  return process.env.EXTERNAL_URL;
}

export async function getStockItems(): Promise<StockItem[]> {
  try {
    const baseUrl = getBaseUrl();
    if (!baseUrl) return [];

    const response = await fetch(`${baseUrl}/stock-items`, {
      cache: "no-store",
    });

    if (!response.ok) return [];

    const data: unknown = await response.json();
    if (!Array.isArray(data)) return [];

    return data
      .map((item) => normalizeStockItem(item))
      .filter((item): item is StockItem => item !== null);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getStockItemById(id: string): Promise<StockItem | null> {
  try {
    const baseUrl = getBaseUrl();
    if (!baseUrl) return null;

    const response = await fetch(`${baseUrl}/stock-items/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data: unknown = await response.json();
    return normalizeStockItem(data);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createStockItemAction(
  values: StockItemFormValues,
): Promise<StockItemActionResult> {
  const parsed = stockItemFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form data",
    };
  }

  const baseUrl = getBaseUrl();
  if (!baseUrl) {
    return { success: false, error: "EXTERNAL_URL is not configured" };
  }

  try {
    const response = await fetch(`${baseUrl}/stock-items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toStockItemPayload(parsed.data)),
    });

    if (!response.ok) {
      return {
        success: false,
        error: "Could not save item. Please try again.",
      };
    }

    revalidatePath("/app/stock-items");
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
}

export async function updateStockItemAction(
  id: string,
  values: StockItemFormValues,
): Promise<StockItemActionResult> {
  const parsed = stockItemFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form data",
    };
  }

  const baseUrl = getBaseUrl();
  if (!baseUrl) {
    return { success: false, error: "EXTERNAL_URL is not configured" };
  }

  try {
    const response = await fetch(`${baseUrl}/stock-items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toStockItemPayload(parsed.data)),
    });

    if (!response.ok) {
      return {
        success: false,
        error: "Could not update item. Please try again.",
      };
    }

    revalidatePath("/app/stock-items");
    revalidatePath(`/app/stock-items/${id}/edit`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
}

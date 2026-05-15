"use server";

import { revalidatePath } from "next/cache";

import {
  stockItemFormSchema,
  toStockItemPayload,
  type StockItemFormValues,
} from "@/lib/stock-items/schema";

export type CreateStockItemResult =
  | { success: true }
  | { success: false; error: string };

export const getStockItems = async () => {
  try {
    const baseUrl = process.env.EXTERNAL_URL;
    if (!baseUrl) return [];

    const response = await fetch(`${baseUrl}/stock-items`, {
      next: { revalidate: 0 },
    });

    if (!response.ok) return [];

    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export async function createStockItemAction(
  values: StockItemFormValues,
): Promise<CreateStockItemResult> {
  const parsed = stockItemFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form data",
    };
  }

  const baseUrl = process.env.EXTERNAL_URL;
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

import { z } from "zod";

const pricePattern = /^\d+(\.\d{1,2})?$/;

export const stockItemFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(120, "Name must be at most 120 characters"),
  price: z
    .string()
    .trim()
    .min(1, "Price is required")
    .refine((value) => pricePattern.test(value), {
      message: "Enter a valid price (e.g. 12.99)",
    })
    .refine((value) => parseFloat(value) > 0, {
      message: "Price must be greater than 0",
    })
    .refine((value) => parseFloat(value) <= 999_999.99, {
      message: "Price is too high",
    }),
  unit: z
    .string()
    .trim()
    .min(1, "Unit is required")
    .max(30, "Unit must be at most 30 characters"),
  brand: z
    .string()
    .trim()
    .min(1, "Brand is required")
    .max(120, "Brand must be at most 120 characters"),
});

export type StockItemFormValues = z.infer<typeof stockItemFormSchema>;

export const stockItemFormDefaultValues: StockItemFormValues = {
  name: "",
  price: "",
  unit: "",
  brand: "",
};

export function toStockItemPayload(values: StockItemFormValues) {
  return {
    name: values.name.trim(),
    price: parseFloat(values.price),
    unit: values.unit.trim(),
    brand: values.brand.trim(),
  };
}

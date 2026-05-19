import { z } from "zod";

const pricePattern = /^\d+(\.\d{1,2})?$/;
const quantityPattern = /^\d+$/;

export const stockItemFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(120, "Name must be at most 120 characters"),
  price: z
    .string()
    .trim()
    .refine((value) => value === "" || pricePattern.test(value), {
      message: "Enter a valid price (e.g. 12.99)",
    })
    .refine((value) => value === "" || parseFloat(value) > 0, {
      message: "Price must be greater than 0",
    })
    .refine((value) => value === "" || parseFloat(value) <= 999_999.99, {
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
  quantity: z
    .string()
    .trim()
    .min(1, "Quantity is required")
    .refine((value) => quantityPattern.test(value), {
      message: "Enter a valid whole number (e.g. 10)",
    })
    .refine((value) => parseInt(value, 10) >= 0, {
      message: "Quantity cannot be negative",
    })
    .refine((value) => parseInt(value, 10) <= 999_999, {
      message: "Quantity is too high",
    }),
});

export type StockItemFormValues = z.infer<typeof stockItemFormSchema>;

export const stockItemFormDefaultValues: StockItemFormValues = {
  name: "",
  price: "",
  unit: "",
  brand: "",
  quantity: "",
};

export function toStockItemPayload(
  values: StockItemFormValues,
  ownerEmail: string,
) {
  return {
    name: values.name.trim(),
    price: values.price.trim() ? parseFloat(values.price) : null,
    unit: values.unit.trim(),
    brand: values.brand.trim(),
    quantity: parseInt(values.quantity, 10),
    ownerEmail: ownerEmail.trim(),
  };
}

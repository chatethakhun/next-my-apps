"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  createStockItemAction,
  updateStockItemAction,
} from "@/actions/stock-items/actions";
import { FormField } from "@/components/form/form-field";
import {
  stockItemFormDefaultValues,
  stockItemFormSchema,
  type StockItemFormValues,
} from "@/lib/stock-items/schema";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion";

type StockItemFormProps = {
  mode: "create" | "edit";
  itemId?: string;
  defaultValues?: StockItemFormValues;
};

export function StockItemForm({ mode, itemId, defaultValues }: StockItemFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<StockItemFormValues>({
    resolver: zodResolver(stockItemFormSchema),
    defaultValues: defaultValues ?? stockItemFormDefaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  async function onSubmit(values: StockItemFormValues) {
    setSubmitError(null);

    const result =
      isEdit && itemId
        ? await updateStockItemAction(itemId, values)
        : await createStockItemAction(values);

    if (!result.success) {
      setSubmitError(result.error);
      return;
    }

    router.push("/app/stock-items");
    router.refresh();
  }

  function handleCancel() {
    router.push("/app/stock-items");
  }

  function fieldClass(hasError: boolean) {
    return `input input-bordered w-full transition-shadow ${
      hasError ? "input-error" : ""
    }`;
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
      noValidate
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="grid gap-2 sm:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <FormField id="name" label="Name" error={errors.name?.message}>
          <motion.div
            animate={errors.name ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <input
              id="name"
              type="text"
              autoComplete="off"
              placeholder="e.g. Dish soap"
              className={fieldClass(Boolean(errors.name))}
              aria-invalid={Boolean(errors.name)}
              {...register("name")}
            />
          </motion.div>
        </FormField>

        <FormField id="brand" label="Brand" error={errors.brand?.message}>
          <motion.div
            animate={errors.brand ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <input
              id="brand"
              type="text"
              autoComplete="off"
              placeholder="e.g. Sunlight"
              className={fieldClass(Boolean(errors.brand))}
              aria-invalid={Boolean(errors.brand)}
              {...register("brand")}
            />
          </motion.div>
        </FormField>

        <FormField id="price" label="Price" error={errors.price?.message}>
          <motion.div
            animate={errors.price ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <input
              id="price"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="e.g. 49.90"
              className={fieldClass(Boolean(errors.price))}
              aria-invalid={Boolean(errors.price)}
              {...register("price")}
            />
          </motion.div>
        </FormField>

        <FormField id="unit" label="Unit" error={errors.unit?.message}>
          <motion.div
            animate={errors.unit ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <input
              id="unit"
              type="text"
              autoComplete="off"
              placeholder="e.g. bottle, kg, pack"
              className={fieldClass(Boolean(errors.unit))}
              aria-invalid={Boolean(errors.unit)}
              {...register("unit")}
            />
          </motion.div>
        </FormField>
      </motion.div>

      <AnimatePresence mode="wait">
        {submitError ? (
          <motion.p
            key="submit-error"
            className="mt-4 text-sm text-error"
            role="alert"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {submitError}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <motion.div
        className="mt-6 flex flex-wrap items-center gap-3"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.15 }}
      >
        <motion.button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting || !isValid || !isDirty}
          whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-sm" />
              Saving…
            </>
          ) : isEdit ? (
            "Save changes"
          ) : (
            "Save item"
          )}
        </motion.button>
        <motion.button
          type="button"
          className="btn btn-ghost"
          disabled={isSubmitting}
          whileTap={{ scale: 0.97 }}
          onClick={handleCancel}
        >
          Cancel
        </motion.button>
      </motion.div>
    </motion.form>
  );
}

"use client";

import { motion } from "framer-motion";

import { fadeInUp, staggerContainer } from "@/lib/motion";

export type StockItemRecord = {
  id?: string | number;
  name?: string;
  brand?: string;
  price?: string | number;
  unit?: string;
};

type StockItemsListProps = {
  items: StockItemRecord[];
};

export function StockItemsList({ items }: StockItemsListProps) {
  if (items.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
    >
      <h2 className="mb-3 text-lg font-medium text-zinc-900 dark:text-zinc-50">
        Your items
      </h2>
      <motion.ul
        className="divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {items.map((item) => (
          <motion.li
            key={String(item.id ?? item.name)}
            className="px-4 py-3 text-sm"
            variants={fadeInUp}
            layout
          >
            <p className="font-medium text-zinc-900 dark:text-zinc-50">
              {String(item.name ?? "—")}
            </p>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">
              {String(item.brand ?? "—")} · {String(item.price ?? "—")}
              {item.unit ? ` / ${String(item.unit)}` : ""}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}

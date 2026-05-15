"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { DeleteStockItemButton } from "@/components/stock-items/delete-stock-item-button";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import type { StockItem } from "@/lib/stock-items/types";

type StockItemsListProps = {
  items: StockItem[];
};

export function StockItemsList({ items }: StockItemsListProps) {
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
            key={item.id}
            className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
            variants={fadeInUp}
            layout
          >
            <div className="min-w-0">
              <p className="font-medium text-zinc-900 dark:text-zinc-50">
                {item.name}
              </p>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                {item.brand} · {item.price} / {item.unit} · Qty {item.quantity}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Link
                href={`/app/stock-items/${item.id}/edit`}
                className="btn btn-ghost btn-sm"
              >
                Edit
              </Link>
              <DeleteStockItemButton id={item.id} name={item.name} />
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}

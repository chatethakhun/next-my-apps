"use client";

import { motion } from "framer-motion";

import { fadeInUp } from "@/lib/motion";

export function StockItemsPageHeader() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Stock Items
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Manage your household stock here.
      </p>
    </motion.div>
  );
}

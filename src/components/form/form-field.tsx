"use client";

import { AnimatePresence, motion } from "framer-motion";

import { fadeInUp } from "@/lib/motion";

export type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
};

export function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <motion.label
      className="form-control w-full"
      htmlFor={id}
      variants={fadeInUp}
      layout
    >
      <div className="label py-1">
        <span className="label-text font-medium">{label}</span>
      </div>
      {children}
      <div className="label min-h-6 overflow-hidden py-1">
        <AnimatePresence mode="wait" initial={false}>
          {error ? (
            <motion.span
              key="error"
              className="label-text-alt text-error"
              role="alert"
              initial={{ opacity: 0, y: -6, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -4, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {error}
            </motion.span>
          ) : (
            <motion.span
              key="placeholder"
              className="label-text-alt opacity-0"
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
            >
              —
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.label>
  );
}

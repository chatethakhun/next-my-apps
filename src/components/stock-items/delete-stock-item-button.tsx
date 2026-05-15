"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { deleteStockItemAction } from "@/actions/stock-items/actions";

type DeleteStockItemButtonProps = {
  id: string;
  name: string;
  redirectTo?: string;
  size?: "sm" | "md";
};

export function DeleteStockItemButton({
  id,
  name,
  redirectTo = "/app/stock-items",
  size = "sm",
}: DeleteStockItemButtonProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const sizeClass = size === "md" ? "btn-md" : "btn-sm";

  useEffect(() => {
    setMounted(true);
  }, []);

  function openModal() {
    setError(null);
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) {
      dialog.showModal();
    }
  }

  function closeModal() {
    dialogRef.current?.close();
  }

  async function handleDelete() {
    setError(null);
    setIsDeleting(true);

    const result = await deleteStockItemAction(id);

    if (!result.success) {
      setError(result.error);
      setIsDeleting(false);
      return;
    }

    closeModal();
    router.push(redirectTo);
    router.refresh();
  }

  const modal =
    mounted &&
    createPortal(
      <dialog ref={dialogRef} className="modal modal-middle">
        <div className="modal-box mx-auto w-[calc(100%-2rem)] max-w-md sm:w-full">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            Delete item?
          </h3>
          <p className="py-4 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="font-medium text-zinc-900 dark:text-zinc-50">
              {name}
            </span>{" "}
            will be removed permanently. This cannot be undone.
          </p>

          {error ? (
            <p className="mb-4 text-sm text-error" role="alert">
              {error}
            </p>
          ) : null}

          <div className="modal-action flex-col gap-2 sm:flex-row">
            <button
              type="button"
              className="btn btn-ghost w-full sm:w-auto"
              disabled={isDeleting}
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-error w-full sm:w-auto"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              {isDeleting ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Deleting…
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="submit" aria-label="Close">
            close
          </button>
        </form>
      </dialog>,
      document.body,
    );

  return (
    <>
      <button
        type="button"
        className={`btn btn-error btn-outline ${sizeClass} shrink-0`}
        onClick={openModal}
      >
        Delete
      </button>
      {modal}
    </>
  );
}

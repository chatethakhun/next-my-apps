"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

type ToastType = "success" | "error";

type ToastItem = {
  id: string;
  type: ToastType;
  message: string;
};

type ToastInput = {
  type: ToastType;
  message: string;
  durationMs?: number;
};

type ToastContextValue = {
  toast: (input: ToastInput) => void;
  success: (message: string) => void;
  error: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION_MS = 4000;

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const isClient = useIsClient();

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    ({ type, message, durationMs = DEFAULT_DURATION_MS }: ToastInput) => {
      const id = crypto.randomUUID();
      setToasts((current) => [...current, { id, type, message }]);

      window.setTimeout(() => {
        dismiss(id);
      }, durationMs);
    },
    [dismiss],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      toast,
      success: (message) => toast({ type: "success", message }),
      error: (message) => toast({ type: "error", message }),
    }),
    [toast],
  );

  const toastPortal =
    isClient &&
    toasts.length > 0 &&
    createPortal(
      <div className="toast toast-top toast-center z-100 w-full max-w-sm px-4 pt-4 sm:toast-end sm:px-0">
        {toasts.map((item) => (
          <div
            key={item.id}
            role="status"
            className={`alert shadow-lg ${
              item.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            <span className="text-sm">{item.message}</span>
            <button
              type="button"
              className="btn btn-ghost btn-xs btn-circle"
              aria-label="Dismiss"
              onClick={() => dismiss(item.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>,
      document.body,
    );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toastPortal}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

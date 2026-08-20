import type { ReactNode } from "react";
import { ModalContext } from "./ModalContext";

interface RootProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Root({ isOpen, onClose, children }: RootProps) {
  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ onClose }}>
      <div
        role="presentation"
        onClick={onClose}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      >
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
}

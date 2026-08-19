import { createContext, useContext } from 'react';

interface ModalContextValue {
    onClose: () => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export function useModalContext() {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error('Modal parts must be used inside Modal.Root');
    return ctx;
}
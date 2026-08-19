import type { ReactNode } from 'react';
import { ModalContext } from './ModalContext';

interface RootProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Root({ isOpen, onClose, children }: RootProps) {
  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ onClose }}>
      <div role="presentation" onClick={onClose} style={overlayStyle}>
        <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} style={contentStyle}>
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const contentStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 8,
  padding: 24,
  minWidth: 300,
  maxWidth: 500,
};
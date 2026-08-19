import type { ReactNode } from 'react';

export function Body({ children }: { children: ReactNode }) {
    return <div style={{ marginBottom: 16 }}>{children}</div>;
}
import type { ReactNode } from 'react';

export function Footer({ children }: { children: ReactNode }) {
    return <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{children}</div>;
}
import type { ReactNode } from 'react';

export function Footer({ children }: { children: ReactNode }) {
    return <div className="flex justify-end">{children}</div>;
}
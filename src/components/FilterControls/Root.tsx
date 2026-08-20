import type { ReactNode } from 'react';
import { FilterContext } from './FilterContext';

export function Root({ children }: { children: ReactNode }) {
    return (
        <FilterContext.Provider value={{}}>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">{children}</div>
        </FilterContext.Provider>
    );
}
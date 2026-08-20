import { createContext, useContext } from 'react';

const FilterContext = createContext<object | null>(null);

export function useFilterContext() {
    const ctx = useContext(FilterContext);
    if (!ctx) throw new Error('Filter parts must be used inside FilterControls.Root');
    return ctx;
}

export { FilterContext };
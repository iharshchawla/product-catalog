import { createContext, useContext } from "react";

interface FilterContextValue {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

const FilterContext = createContext<FilterContextValue | null>(null);

export function useFilterContext() {
  const ctx = useContext(FilterContext);
  if (!ctx)
    throw new Error("Filter parts must be used inside FilterControls.Root");
  return ctx;
}

export { FilterContext };

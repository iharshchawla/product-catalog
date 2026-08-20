import { useFilterContext } from "./FilterContext";

export function ClearFiltersButton() {
  const { hasActiveFilters, onClearFilters } = useFilterContext();

  if (!hasActiveFilters) return null;

  return (
    <button
      onClick={onClearFilters}
      className="text-sm text-slate-500 hover:text-slate-800 underline cursor-pointer transition-colors"
    >
      Clear filters
    </button>
  );
}

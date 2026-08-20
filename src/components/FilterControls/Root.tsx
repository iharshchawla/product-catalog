import type { ReactNode } from "react";
import { FilterContext } from "./FilterContext";
import { useCatalogStore } from "../../store/catalogStore";
import { ClearFiltersButton } from "./ClearFiltersButton";

export function Root({ children }: { children: ReactNode }) {
  const { search, category, setSearch, setCategory } = useCatalogStore();

  const hasActiveFilters = search.trim() !== "" || category !== "";

  const onClearFilters = () => {
    setSearch("");
    setCategory("");
  };

  return (
    <FilterContext.Provider value={{ hasActiveFilters, onClearFilters }}>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3">{children}</div>
        <div className="mt-2 h-5">
          <ClearFiltersButton />
        </div>
      </div>
    </FilterContext.Provider>
  );
}

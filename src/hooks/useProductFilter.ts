import { useMemo } from "react";
import type { Product } from "../types/product";

export function useProductFilter(products: Product[], search: string) {
  return useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return products;
    return products.filter((p) => p.name.toLowerCase().includes(query));
  }, [products, search]);
}

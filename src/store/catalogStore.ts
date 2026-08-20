import { create } from "zustand";
import type { Product } from "../types/product";

interface CatalogState {
  search: string;
  category: string;
  selectedProduct: Product | null;
  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
  setSelectedProduct: (product: Product | null) => void;
}

export const useCatalogStore = create<CatalogState>((set) => ({
  search: "",
  category: "",
  selectedProduct: null,
  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
  setSelectedProduct: (selectedProduct) => set({ selectedProduct }),
}));

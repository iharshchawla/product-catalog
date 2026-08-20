import { lazy, Suspense } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useProducts } from "./hooks/useProducts";
import { useProductFilter } from "./hooks/useProductFilter";
import { useCatalogStore } from "./store/catalogStore";
import { ProductList } from "./components/ProductList";
import { FilterControls } from "./components/FilterControls";

const ProductDetailModalWrapper = lazy(
  () => import("./components/ProductDetailModalWrapper"),
);
const CATEGORIES = [
  "Electronics",
  "Sportswear",
  "Home Appliances",
  "Accessories",
];

function App() {
  const {
    search,
    category,
    selectedProduct,
    setSearch,
    setCategory,
    setSelectedProduct,
  } = useCatalogStore();

  const debouncedSearch = useDebounce(search);
  const { products, loading, error } = useProducts(category || undefined);
  const filtered = useProductFilter(products, debouncedSearch);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-[#8254FD] text-white px-4 py-4 sm:px-8">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-relaxed"
          style={{
            WebkitTextStroke: "1px black",
            paintOrder: "stroke fill",
          }}
        >
          Product Catalog
        </h1>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 sm:px-8">
        <FilterControls.Root>
          <FilterControls.Search value={search} onChange={setSearch} />
          <FilterControls.CategoryDropdown
            value={category}
            onChange={setCategory}
            categories={CATEGORIES}
          />
        </FilterControls.Root>

        <ProductList
          products={filtered}
          loading={loading}
          error={error}
          onProductClick={setSelectedProduct}
        />
      </main>

      {selectedProduct && (
        <Suspense fallback={null}>
          <ProductDetailModalWrapper
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;

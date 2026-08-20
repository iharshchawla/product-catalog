import { lazy, Suspense } from 'react';
import { useDebounce } from './hooks/useDebounce';
import { useProducts } from './hooks/useProducts';
import { useProductFilter } from './hooks/useProductFilter';
import { useCatalogStore } from './store/catalogStore';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductList } from './components/ProductList';

const ProductDetailModalWrapper = lazy(() => import('./components/ProductDetailModalWrapper'));
const CATEGORIES = ['Electronics', 'Sportswear', 'Home Appliances', 'Accessories'];

function App() {
  const { search, category, selectedProduct, setSearch, setCategory, setSelectedProduct } =
    useCatalogStore();

  const debouncedSearch = useDebounce(search);
  const { products, loading, error } = useProducts(category || undefined);
  const filtered = useProductFilter(products, debouncedSearch);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-slate-900 text-white px-4 py-5 sm:px-8">
        <h1 className="text-xl sm:text-2xl font-semibold">Product Catalog</h1>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 sm:px-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter value={category} onChange={setCategory} categories={CATEGORIES} />
        </div>

        <ProductList
          products={filtered}
          loading={loading}
          error={error}
          onProductClick={setSelectedProduct}
        />
      </main>


      {selectedProduct && (
        <Suspense fallback={null}>
          <ProductDetailModalWrapper product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        </Suspense>
      )}

    </div>
  );
}

export default App;
import { useDebounce } from './hooks/useDebounce';
import { useProducts } from './hooks/useProducts';
import { useProductFilter } from './hooks/useProductFilter';
import { useCatalogStore } from './store/catalogStore';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductList } from './components/ProductList';
import { ProductDetailModal } from './components/ProductDetailModal';

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

      <ProductDetailModal.Root isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
        <ProductDetailModal.Header title={selectedProduct?.name ?? ''} />
        <ProductDetailModal.Body>
          <p className="text-slate-600">
            Price: <span className="font-semibold text-slate-900">${selectedProduct?.price.toFixed(2)}</span>
          </p>
          <p className="text-slate-600">
            Category: <span className="font-semibold text-slate-900">{selectedProduct?.category}</span>
          </p>
        </ProductDetailModal.Body>
        <ProductDetailModal.Footer>
          <button
            onClick={() => setSelectedProduct(null)}
            className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-700 transition-colors">
            Close
          </button>
        </ProductDetailModal.Footer>
      </ProductDetailModal.Root>
    </div>
  );
}

export default App;
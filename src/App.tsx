import { useState } from 'react';
import { useProducts } from './hooks/useProducts';
import { useDebounce } from './hooks/useDebounce';
import { useProductFilter } from './hooks/useProductFilter';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductList } from './components/ProductList';
import { ProductDetailModal } from './components/ProductDetailModal';
import type { Product } from './types/product';

const CATEGORIES = ['Electronics', 'Sportswear', 'Home Appliances', 'Accessories'];

function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const debouncedSearch = useDebounce(search);
  const { products, loading, error } = useProducts(category || undefined);
  const filtered = useProductFilter(products, debouncedSearch);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
      <h1>Product Catalog</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter value={category} onChange={setCategory} categories={CATEGORIES} />
      </div>

      <ProductList
        products={filtered}
        loading={loading}
        error={error}
        onProductClick={setSelectedProduct}
      />

      <ProductDetailModal.Root
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      >
        <ProductDetailModal.Header title={selectedProduct?.name ?? ''} />
        <ProductDetailModal.Body>
          <p>Price: ${selectedProduct?.price.toFixed(2)}</p>
          <p>Category: {selectedProduct?.category}</p>
        </ProductDetailModal.Body>
        <ProductDetailModal.Footer>
          <button onClick={() => setSelectedProduct(null)}>Close</button>
        </ProductDetailModal.Footer>
      </ProductDetailModal.Root>
    </div>
  );
}

export default App;
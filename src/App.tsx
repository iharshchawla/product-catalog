import { useState } from 'react';
import { useProducts } from './hooks/useProducts';
import { useDebounce } from './hooks/useDebounce';
import { useProductFilter } from './hooks/useProductFilter';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductList } from './components/ProductList';

function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const debouncedSearch = useDebounce(search);

  const { products, loading, error } = useProducts(category || undefined);
  const filtered = useProductFilter(products, debouncedSearch);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <SearchBar value={search} onChange={setSearch} />
      <CategoryFilter value={category} onChange={setCategory} categories={['Electronics', 'Sportswear', 'Home Appliances', 'Accessories']} />
      <ProductList products={filtered} loading={loading} error={error} onProductClick={(p) => console.log('clicked', p)} />
    </>
  );
}

export default App;
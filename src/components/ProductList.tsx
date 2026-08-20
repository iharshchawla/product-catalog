import { List } from 'react-window';
import { ProductListItem } from './ProductListItem';
import type { Product } from '../types/product';

interface ProductListProps {
    products: Product[];
    loading: boolean;
    error?: Error;
    onProductClick: (product: Product) => void;
}

export function ProductList({ products, loading, error, onProductClick }: ProductListProps) {
    if (loading) return <p className="text-slate-500 text-sm">Loading products...</p>;
    if (error) return <p role="alert" className="text-red-600 text-sm">Error: {error.message}</p>;
    if (products.length === 0) return <p className="text-slate-500 text-sm">No products found.</p>;

    return (
        <List
            rowCount={products.length}
            rowHeight={64}
            rowComponent={({ index, style }) => (
                <div style={style}>
                    <ProductListItem product={products[index]} onClick={onProductClick} />
                </div>
            )}
            rowProps={{}}
            style={{ height: 'calc(100vh - 220px)', width: '100%' }}
        />
    );
}
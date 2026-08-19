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
    if (loading) return <p>Loading products...</p>;
    if (error) return <p role="alert">Error: {error.message}</p>;
    if (products.length === 0) return <p>No products found.</p>;

    return (
        <List
            rowCount={products.length}
            rowHeight={44}
            rowComponent={({ index, style }) => (
                <div style={style}>
                    <ProductListItem product={products[index]} onClick={onProductClick} />
                </div>
            )}
            rowProps={{}}
            style={{ height: 400, width: '100%' }}
        />
    );
}
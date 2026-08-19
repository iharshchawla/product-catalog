import { memo } from 'react';
import type { Product } from '../types/product';

interface ProductListItemProps {
    product: Product;
    onClick: (product: Product) => void;
}

function ProductListItemBase({ product, onClick }: ProductListItemProps) {
    return (
        <div onClick={() => onClick(product)} style={{ cursor: 'pointer', padding: 8, borderBottom: '1px solid #eee' }}>
            <strong>{product.name}</strong>
            <span> — ${product.price.toFixed(2)}</span>
            <span> ({product.category})</span>
        </div>
    );
}

export const ProductListItem = memo(ProductListItemBase);
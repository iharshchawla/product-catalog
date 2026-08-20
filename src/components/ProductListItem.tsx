import { memo } from 'react';
import type { Product } from '../types/product';

interface ProductListItemProps {
    product: Product;
    onClick: (product: Product) => void;
}

function ProductListItemBase({ product, onClick }: ProductListItemProps) {
    return (
        <div
            onClick={() => onClick(product)}
            className="group flex items-center justify-between px-4 py-3 bg-white border border-slate-200
                 rounded-md mb-2 cursor-pointer transition-colors duration-150
                 hover:bg-slate-50 hover:border-slate-300">
            <div>
                <p className="font-medium text-slate-900 group-hover:text-slate-950">{product.name}</p>
                <p className="text-xs text-slate-500">{product.category}</p>
            </div>
            <span className="font-semibold text-slate-900">${product.price.toFixed(2)}</span>
        </div>
    );
}

export const ProductListItem = memo(ProductListItemBase);
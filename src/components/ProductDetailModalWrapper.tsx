import { ProductDetailModal } from './ProductDetailModal';
import type { Product } from '../types/product';

interface Props {
    product: Product;
    onClose: () => void;
}

export default function ProductDetailModalWrapper({ product, onClose }: Props) {
    return (
        <ProductDetailModal.Root isOpen onClose={onClose}>
            <ProductDetailModal.Header title={product.name} />
            <ProductDetailModal.Body>
                <p className="text-slate-600">
                    Price: <span className="font-semibold text-slate-900">${product.price.toFixed(2)}</span>
                </p>
                <p className="text-slate-600">
                    Category: <span className="font-semibold text-slate-900">{product.category}</span>
                </p>
            </ProductDetailModal.Body>
            <ProductDetailModal.Footer>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-700 transition-colors"
                >
                    Close
                </button>
            </ProductDetailModal.Footer>
        </ProductDetailModal.Root>
    );
}
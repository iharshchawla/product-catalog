import { ProductDetailModal } from "./ProductDetailModal";
import type { Product } from "../types/product";

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
          Price:{" "}
          <span className="font-semibold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
        </p>
        <p className="text-slate-600">
          Category:{" "}
          <span className="font-semibold text-slate-900">
            {product.category}
          </span>
        </p>
      </ProductDetailModal.Body>
      <ProductDetailModal.Footer>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-[#8254FD] text-white rounded-md hover:bg-[#6f3ff0]
             hover:shadow-md transition-all duration-150 active:scale-95 cursor-pointer"
        >
          Close
        </button>
      </ProductDetailModal.Footer>
    </ProductDetailModal.Root>
  );
}

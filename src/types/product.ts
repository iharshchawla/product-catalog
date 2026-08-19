export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface GetProductsData {
  products: Product[];
}

export interface GetProductsVars {
  category?: string;
}

export interface GetProductData {
  product: Product;
}

export interface GetProductVars {
  productId: string;
}

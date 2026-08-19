import { gql, type TypedDocumentNode } from "@apollo/client";
import type {
  GetProductsData,
  GetProductsVars,
  GetProductData,
  GetProductVars,
} from "../types/product";

export const GET_PRODUCTS: TypedDocumentNode<GetProductsData, GetProductsVars> =
  gql`
    query GetProducts($category: String) {
      products(category: $category) {
        id
        name
        price
        category
      }
    }
  `;

export const GET_PRODUCT: TypedDocumentNode<GetProductData, GetProductVars> =
  gql`
    query GetProduct($productId: ID!) {
      product(id: $productId) {
        id
        name
        price
        category
      }
    }
  `;

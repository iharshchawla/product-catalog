import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "../graphql/queries";

export function useProducts(category?: string) {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { category },
  });

  return { products: data?.products ?? [], loading, error };
}

import { renderHook, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";
import type { ReactNode } from "react";
import { useProducts } from "./useProducts";
import { GET_PRODUCTS } from "../graphql/queries";

const mocks = [
  {
    request: { query: GET_PRODUCTS, variables: { category: undefined } },
    result: {
      data: {
        products: [
          {
            id: "1",
            name: "Wireless Mouse",
            price: 80.24,
            category: "Electronics",
            __typename: "Product",
          },
        ],
      },
    },
  },
];

function wrapper({ children }: { children: ReactNode }) {
  return <MockedProvider mocks={mocks}>{children}</MockedProvider>;
}

test("returns loading true initially, then products after resolving", async () => {
  const { result } = renderHook(() => useProducts(), { wrapper });

  expect(result.current.loading).toBe(true);

  await waitFor(() => expect(result.current.loading).toBe(false));

  expect(result.current.products).toHaveLength(1);
  expect(result.current.products[0].name).toBe("Wireless Mouse");
});

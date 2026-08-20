import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing/react";
import App from "./App";
import { GET_PRODUCTS } from "./graphql/queries";
import { useCatalogStore } from "./store/catalogStore";

beforeEach(() => {
  useCatalogStore.setState({ search: "", category: "", selectedProduct: null });
});

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

test("clicking a product opens the modal with correct details, and closing it works", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <App />
    </MockedProvider>,
  );

  const product = await screen.findByText("Wireless Mouse");
  await userEvent.click(product);

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  const dialog = screen.getByRole("dialog");
  expect(within(dialog).getByText(/80.24/)).toBeInTheDocument();

  await userEvent.click(screen.getByLabelText("Close"));

  await waitFor(() => {
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

// end-to-end test
test("selecting a category filters the product list via a new query", async () => {
  const mocksWithCategory = [
    ...mocks,
    {
      request: { query: GET_PRODUCTS, variables: { category: "Sportswear" } },
      result: {
        data: {
          products: [
            {
              id: "2",
              name: "Yoga Mat",
              price: 34.99,
              category: "Sportswear",
              __typename: "Product",
            },
          ],
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocksWithCategory}>
      <App />
    </MockedProvider>,
  );

  await screen.findByText("Wireless Mouse");

  await userEvent.selectOptions(screen.getByRole("combobox"), "Sportswear");

  await screen.findByText("Yoga Mat");
  expect(screen.queryByText("Wireless Mouse")).not.toBeInTheDocument();
});

test("typing in search filters the visible product list", async () => {
  const mocksMultiple = [
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
            {
              id: "2",
              name: "Yoga Mat",
              price: 34.99,
              category: "Sportswear",
              __typename: "Product",
            },
          ],
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocksMultiple}>
      <App />
    </MockedProvider>,
  );

  await screen.findByText("Wireless Mouse");
  expect(screen.getByText("Yoga Mat")).toBeInTheDocument();

  await userEvent.type(screen.getByRole("textbox"), "mouse");

  await waitFor(() => {
    expect(screen.queryByText("Yoga Mat")).not.toBeInTheDocument();
  });
  expect(screen.getByText("Wireless Mouse")).toBeInTheDocument();
});

test("shows an error message when the query fails", async () => {
  const errorMock = [
    {
      request: { query: GET_PRODUCTS, variables: { category: undefined } },
      error: new Error("Network error"),
    },
  ];

  render(
    <MockedProvider mocks={errorMock}>
      <App />
    </MockedProvider>,
  );

  await waitFor(() => {
    expect(screen.getByRole("alert")).toHaveTextContent(/network error/i);
  });
});

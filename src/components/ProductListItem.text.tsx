import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductListItem } from "./ProductListItem";
import type { Product } from "../types/product";

const product: Product = {
  id: "1",
  name: "Wireless Mouse",
  price: 80.24,
  category: "Electronics",
};

test("renders product name, price, and category", () => {
  render(<ProductListItem product={product} onClick={() => {}} />);
  expect(screen.getByText("Wireless Mouse")).toBeInTheDocument();
  expect(screen.getByText("$80.24")).toBeInTheDocument();
  expect(screen.getByText("Electronics")).toBeInTheDocument();
});

test("calls onClick with the product when clicked", async () => {
  const onClick = jest.fn();
  render(<ProductListItem product={product} onClick={onClick} />);
  await userEvent.click(screen.getByText("Wireless Mouse"));
  expect(onClick).toHaveBeenCalledWith(product);
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterControls } from "./index";
import { useCatalogStore } from "../../store/catalogStore";

beforeEach(() => {
  useCatalogStore.setState({ search: "", category: "", selectedProduct: null });
});

test("renders Search and CategoryDropdown", () => {
  render(
    <FilterControls.Root>
      <FilterControls.Search value="" onChange={() => {}} />
      <FilterControls.CategoryDropdown
        value=""
        onChange={() => {}}
        categories={["Electronics"]}
      />
    </FilterControls.Root>,
  );
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByRole("combobox")).toBeInTheDocument();
});

test('does not show "Clear filters" when no filters are active', () => {
  render(
    <FilterControls.Root>
      <FilterControls.Search value="" onChange={() => {}} />
      <FilterControls.CategoryDropdown
        value=""
        onChange={() => {}}
        categories={["Electronics"]}
      />
    </FilterControls.Root>,
  );
  expect(screen.queryByText("Clear filters")).not.toBeInTheDocument();
});

test('shows "Clear filters" when search is active, and clicking it resets store state', async () => {
  useCatalogStore.setState({
    search: "mouse",
    category: "",
    selectedProduct: null,
  });

  render(
    <FilterControls.Root>
      <FilterControls.Search value="mouse" onChange={() => {}} />
      <FilterControls.CategoryDropdown
        value=""
        onChange={() => {}}
        categories={["Electronics"]}
      />
    </FilterControls.Root>,
  );

  expect(screen.getByText("Clear filters")).toBeInTheDocument();

  await userEvent.click(screen.getByText("Clear filters"));

  expect(useCatalogStore.getState().search).toBe("");
  expect(useCatalogStore.getState().category).toBe("");
});

test('shows "Clear filters" when category is active', () => {
  useCatalogStore.setState({
    search: "",
    category: "Electronics",
    selectedProduct: null,
  });

  render(
    <FilterControls.Root>
      <FilterControls.Search value="" onChange={() => {}} />
      <FilterControls.CategoryDropdown
        value="Electronics"
        onChange={() => {}}
        categories={["Electronics"]}
      />
    </FilterControls.Root>,
  );

  expect(screen.getByText("Clear filters")).toBeInTheDocument();
});

test("ClearFiltersButton throws if used outside Root (context guard)", () => {
  const consoleError = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});
  // Import directly to test the guard in isolation
  const { ClearFiltersButton } = jest.requireActual("./ClearFiltersButton");
  expect(() => render(<ClearFiltersButton />)).toThrow();
  consoleError.mockRestore();
});

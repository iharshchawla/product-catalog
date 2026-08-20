import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "./SearchBar";

test("renders with the given value", () => {
  render(<SearchBar value="mouse" onChange={() => {}} />);
  expect(screen.getByRole("textbox")).toHaveValue("mouse");
});

test("calls onChange when typing", async () => {
  const onChange = jest.fn();
  render(<SearchBar value="" onChange={onChange} />);
  await userEvent.type(screen.getByRole("textbox"), "a");
  expect(onChange).toHaveBeenCalledWith("a");
});

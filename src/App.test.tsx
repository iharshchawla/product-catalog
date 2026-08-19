import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the product catalog heading", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /product catalog/i,
      }),
    ).toBeInTheDocument();
  });
});

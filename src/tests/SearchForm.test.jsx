import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "../components/SearchForm";

const mockProps = {
  onSubmit: jest.fn(),
};

describe("SearchForm", () => {
  test("it renders", () => {
    render(<SearchForm {...mockProps} />);
    expect(screen.getAllByText(/Type words/)).toHaveLength(2);
  });

  test("call handler on submit", () => {
    const { getByTestId } = render(<SearchForm {...mockProps} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "dog" },
    });
    fireEvent.submit(getByTestId("form"));
    expect(mockProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  test("when not pass validation don't call handler on submit", () => {
    const { getByTestId } = render(<SearchForm {...mockProps} />);
    fireEvent.submit(getByTestId("form"));
    expect(mockProps.onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("Add at least 2 symbol")).toBeInTheDocument();
  });
});

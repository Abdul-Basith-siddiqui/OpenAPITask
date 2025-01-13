import { render, screen, fireEvent } from "@testing-library/react";

import '@testing-library/jest-dom';
import App from "../App";

describe("App Component", () => {
  it("renders the home page correctly", () => {
    render(<App />);
    expect(screen.getByText(/welcome to rest api evaluator/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter oas url/i)).toBeInTheDocument();
    expect(screen.getByText(/get started/i)).toBeInTheDocument();
  });

  it("shows error message when 'Get Started' is clicked without a URL", () => {
    render(<App />  );

    const getStartedButton = screen.getByText(/get started/i);
    fireEvent.click(getStartedButton);

    expect(screen.getByText(/please enter a valid oas url/i)).toBeInTheDocument();
  });
});

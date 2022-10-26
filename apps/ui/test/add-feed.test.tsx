import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AddFeedForm } from "../src/components/add-feed";

describe("AddFeed", () => {
  test("should display 'Add Feed' as the title", () => {
    const fn = jest.fn();
    render(<AddFeedForm onSubmit={fn} />);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  test("Should not fire when the form is empty", async () => {
    const fn = jest.fn();
    render(<AddFeedForm onSubmit={fn} />);
    const input = screen.getByTestId("add-feed-url");
    const button = screen.getByText("Submit");

    await userEvent.click(button);

    expect(fn).not.toHaveBeenCalled();

    await userEvent.type(input, "https://www.google.com");

    expect(input).toHaveValue("https://www.google.com");

    await userEvent.click(button);

    expect(fn).toHaveBeenCalled();
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UpdateFeedForm } from "../components/feed-settings";

describe("Feed Settings", () => {
  it("should render the feed settings form", () => {
    render(
      <UpdateFeedForm initialTitle="Test Feed" onSubmit={jest.fn()} onDelete={jest.fn()} />
    );
    expect(screen.getByLabelText("Feed Names")).toBeInTheDocument();
    expect(screen.getByLabelText("Remove Feed")).toBeInTheDocument();
  });

  it("should update the feed title", async () => {
    const onSubmit = jest.fn();
    render(
      <UpdateFeedForm initialTitle="Test Feed" onSubmit={onSubmit} onDelete={jest.fn()} />
    );

    const button = screen.getByText("Save");
    const input = screen.getByTestId("update-feed-name");
    await userEvent.clear(input);
    await userEvent.type(input, "New Feed");

    fireEvent(button, new MouseEvent("click", { bubbles: true }));

    expect(onSubmit).toHaveBeenCalledWith("New Feed");
  });

  it("should delete the feed", () => {
    const onDelete = jest.fn();
    render(
      <UpdateFeedForm initialTitle="Test Feed" onSubmit={jest.fn()} onDelete={onDelete} />
    );

    const button = screen.getByText("Unsubscribe");

    fireEvent(button, new MouseEvent("click", { bubbles: true }));
    expect(onDelete).toHaveBeenCalled();
  });
});

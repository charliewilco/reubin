import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { graphql } from "msw";
import { setupServer } from "msw/node";
import { UpdateFeedForm } from "../components/feed-settings";
import type {
  AllTagsQuery,
  GetFeedByIdQuery,
  FeedDetailsFragment,
} from "../lib/__generated__";

const mockFeed: FeedDetailsFragment = {
  __typename: "Feed",
  id: "2",
  title: "Test Feed #2",
  feedURL: "https://example.com",
  link: "",
  tag: null,
};

const server = setupServer(
  graphql.query<GetFeedByIdQuery>("GetFeedById", (_req, res, ctx) => {
    return res(
      ctx.data({
        feed: mockFeed,
      })
    );
  }),

  graphql.query<AllTagsQuery>("AllTags", (_req, res, ctx) => {
    return res(
      ctx.data({
        tags: [
          {
            __typename: "Tag",
            id: "1",
            title: "Test Tag #1",
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

describe("Feed Settings", () => {
  it("should render the feed settings form", () => {
    render(
      <UpdateFeedForm initialFeed={mockFeed} onSubmit={jest.fn()} onDelete={jest.fn()} />
    );
    expect(screen.getByLabelText("Feed Names")).toBeInTheDocument();
    expect(screen.getByLabelText("Remove Feed")).toBeInTheDocument();
  });

  it("should update the feed title", async () => {
    const onSubmit = jest.fn();
    render(<UpdateFeedForm initialFeed={mockFeed} onSubmit={onSubmit} onDelete={jest.fn()} />);

    const button = screen.getByText("Save");
    const input = screen.getByTestId("update-feed-name");
    await userEvent.clear(input);
    await userEvent.type(input, "New Feed");

    fireEvent(button, new MouseEvent("click", { bubbles: true }));

    expect(onSubmit).toHaveBeenCalledWith("New Feed", null);
  });

  it("should delete the feed", () => {
    const onDelete = jest.fn();
    render(<UpdateFeedForm initialFeed={mockFeed} onSubmit={jest.fn()} onDelete={onDelete} />);

    const button = screen.getByText("Unsubscribe");

    fireEvent(button, new MouseEvent("click", { bubbles: true }));
    expect(onDelete).toHaveBeenCalled();
  });
});

import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { SWRConfig } from "swr";

import { FeedList } from "../components/feed-list";
import { DashboardProvider } from "../hooks/useDashboard";
import type { GetFeedsQuery } from "../lib/__generated__";

import { setupServer } from "msw/node";
import { graphql } from "msw";

const server = setupServer(
  graphql.query<GetFeedsQuery>("GetFeeds", (req, res, ctx) => {
    return res(
      ctx.data({
        feeds: [
          {
            __typename: "Feed",
            id: "1",
            title: "Test Feed #1",
            feedURL: "https://example.com",
            link: "",
          },
          {
            __typename: "Feed",
            id: "2",
            title: "Test Feed #2",
            feedURL: "https://example.com",
            link: "",
          },
          {
            __typename: "Feed",
            id: "3",
            title: "Test Feed #3",
            feedURL: "https://example.com",
            link: "",
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
  it("should render the feed settings form", async () => {
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <DashboardProvider>
          <FeedList />
        </DashboardProvider>
      </SWRConfig>
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getByRole("alert"));

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByText("Test Feed #1")).toBeInTheDocument();
  });
});

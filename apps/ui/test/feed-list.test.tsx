import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { SWRConfig } from "swr";

import { FeedList } from "../src/components/feed-list";
import { DashboardProvider } from "../src/hooks/useDashboard";
import type { GetFeedsQuery } from "../src/lib/__generated__";

import { setupServer } from "msw/node";
import { graphql } from "msw";

const server = setupServer(
	graphql.query<GetFeedsQuery>("GetFeeds", (_req, res, ctx) => {
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
				tags: [],
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
	test("should render the feed settings form", async () => {
		render(
			<SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
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

	test("Should select a feed", async () => {
		render(
			<SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
				<DashboardProvider>
					<FeedList />
				</DashboardProvider>
			</SWRConfig>
		);

		await waitForElementToBeRemoved(screen.getByRole("alert"));

		expect(screen.getByRole("list")).toBeInTheDocument();

		fireEvent(screen.getByText("Test Feed #1"), new MouseEvent("click", { bubbles: true }));

		expect(screen.getByTestId("selected")).toHaveTextContent("Test Feed #1");
	});
});

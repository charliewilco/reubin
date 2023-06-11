import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { SWRConfig } from "swr";

import { FeedList } from "../src/components/feed-list";

import { setupServer } from "msw/node";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
	server.resetHandlers();
});
afterAll(() => server.close());

describe("Feed Settings", () => {
	test("should render the feed settings form", async () => {
		render(
			<SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
				<FeedList />
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
				<FeedList />
			</SWRConfig>
		);

		await waitForElementToBeRemoved(screen.getByRole("alert"));

		expect(screen.getByRole("list")).toBeInTheDocument();

		fireEvent(screen.getByText("Test Feed #1"), new MouseEvent("click", { bubbles: true }));

		expect(screen.getByTestId("selected")).toHaveTextContent("Test Feed #1");
	});
});

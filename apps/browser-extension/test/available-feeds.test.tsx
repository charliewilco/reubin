import React from "react";
import { AvailableFeedList } from "../src/components/available-feeds";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";

interface RSSLink {
	href: string;
	type: string;
	title: string;
}
const parse = jest.fn(() =>
	Promise.resolve<RSSLink[]>([
		{ href: "https://example.com", type: "application/rss+xml", title: "Example" },
	])
);

function setupExtension() {
	return render(<AvailableFeedList id="..." onParse={parse} />);
}

describe("AvailableFeedList", () => {
	test("Should render", async () => {
		setupExtension();
		await screen.findAllByRole("alert");

		expect(screen.getByRole("alert")).toBeInTheDocument();
	});

	test.skip("Should render list", async () => {
		setupExtension();

		await waitFor(() => expect(parse).toHaveBeenCalled());
		await waitForElementToBeRemoved(() => screen.getByRole("alert"));

		expect(screen.getByRole("listitem")).toBeInTheDocument();
		expect(screen.getByText("Example")).toBeInTheDocument();
	});
});

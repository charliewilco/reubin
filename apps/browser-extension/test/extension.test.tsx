import React from "react";
import { SWRConfig } from "swr";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { App, type AppProps } from "../src/app";
import { createAddLink } from "../src/create-add-link";
import type { RSSLink } from "../src/rss";

let MOCK_URL = "https://example.com";
let MOCK_LINK: RSSLink = { href: MOCK_URL, type: "application/rss+xml", title: "Example" };

let parse = jest.fn(() => Promise.resolve<RSSLink[]>([MOCK_LINK]));
let parseToRefresh = jest.fn(() => Promise.resolve<RSSLink[]>([MOCK_LINK]));
let parseToEmpty = jest.fn(() => Promise.resolve<RSSLink[]>([]));
let parseToError = jest.fn(() => Promise.reject(new Error("Error from Test")));
let mockLinkCreator = jest.fn();

function setupExtension(
	onParse: AppProps["onParse"] = parse,
	id: AppProps["id"] = MOCK_URL,
	onAddLink: AppProps["onAddLink"] = mockLinkCreator
) {
	return render(
		<SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
			<App id={id} onAddLink={onAddLink} onParse={onParse} />
		</SWRConfig>
	);
}

describe("Browser extension", () => {
	test("Should render list", async () => {
		setupExtension();
		expect(screen.getByRole("alert")).toBeInTheDocument();
		await waitFor(() => expect(parse).toHaveBeenCalled());
		expect(screen.getByRole("listitem")).toBeInTheDocument();
		expect(screen.getByText("Example")).toBeInTheDocument();
		expect(screen.findAllByRole("listitem")).resolves.toHaveLength(1);
	});

	test("clicking on link should open new tab", async () => {
		setupExtension();
		expect(screen.getByRole("alert")).toBeInTheDocument();
		await waitFor(() => expect(parse).toHaveBeenCalled());
		let link = screen.getByLabelText("Add Feed");
		expect(link).toBeInTheDocument();
		fireEvent(link, new MouseEvent("click", { bubbles: true }));
		await waitFor(() =>
			expect(mockLinkCreator).toHaveBeenCalledWith(
				"https://reubin.app/add-feed?url=https%3A%2F%2Fexample.com"
			)
		);
	});
	test("clicking retry should call onParse again", async () => {
		setupExtension(parseToRefresh);
		expect(screen.getByRole("alert")).toBeInTheDocument();
		await waitFor(() => expect(parseToRefresh).toHaveBeenCalled());

		let refreshButton = screen.getByLabelText("Refresh");

		expect(refreshButton).toBeInTheDocument();
		fireEvent(refreshButton, new MouseEvent("click", { bubbles: true }));
		await waitFor(() => expect(parseToRefresh).toHaveBeenCalledTimes(2));
	});

	test("Should render error", async () => {
		setupExtension(parseToError);
		expect(screen.getByRole("alert")).toBeInTheDocument();
		await waitFor(() => expect(parseToError).toHaveBeenCalled());
		expect(screen.getByText("Error from Test")).toBeInTheDocument();
		expect(screen.getByTestId("error-container")).toBeInTheDocument();
	});

	test("Should render empty list", async () => {
		setupExtension(parseToEmpty);
		expect(screen.getByRole("alert")).toBeInTheDocument();
		await waitFor(() => expect(parseToEmpty).toHaveBeenCalled());
		expect(screen.getByText("No feeds found.")).toBeInTheDocument();
		expect(screen.getByTestId("empty-container")).toBeInTheDocument();
	});
});

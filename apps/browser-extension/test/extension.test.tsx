import React from "react";
import { SWRConfig } from "swr";
import { App, type AppProps } from "../src/app";
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

const parseToEmpty = jest.fn(() => Promise.resolve<RSSLink[]>([]));

const parseToError = jest.fn(() => Promise.reject(new Error("Error from Test")));

function setupExtension(props: AppProps = { id: "https://example.com", onParse: parse }) {
	return render(
		<SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
			<App {...props} />
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
	});

	test("Should render error", async () => {
		setupExtension({ id: "https://example.com", onParse: parseToError });
		expect(screen.getByRole("alert")).toBeInTheDocument();
		await waitFor(() => expect(parseToError).toHaveBeenCalled());
		expect(screen.getByText("Error from Test")).toBeInTheDocument();
		expect(screen.getByTestId("error-container")).toBeInTheDocument();
	});

	test("Should render empty list", async () => {
		setupExtension({ id: "https://example.com", onParse: parseToEmpty });
		expect(screen.getByRole("alert")).toBeInTheDocument();
		await waitFor(() => expect(parseToEmpty).toHaveBeenCalled());
		expect(screen.getByText("No feeds found.")).toBeInTheDocument();
		expect(screen.getByTestId("empty-container")).toBeInTheDocument();
	});
});

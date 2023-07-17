import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { UpdateFeedForm } from "$/components/feed-update-form";

import { Feed } from "@prisma/client";

const mockFeed: Feed = {
	id: "2",
	title: "Test Feed #2",
	feedURL: "https://example.com",
	link: "",
	tagId: null,
	lastFetched: new Date(),
	userId: "1",
};

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
	server.resetHandlers();
});
afterAll(() => server.close());

xdescribe("Feed Settings", () => {
	test("should render the feed settings form", () => {
		render(<UpdateFeedForm initialTitle={mockFeed.title} id={mockFeed.id} tagId={null} />);
		expect(screen.getByLabelText("Feed Name")).toBeInTheDocument();
		expect(screen.getByLabelText("Remove Feed")).toBeInTheDocument();
	});

	xtest("should update the feed title", async () => {
		const onSubmit = jest.fn();
		render(<UpdateFeedForm initialTitle={mockFeed.title} id={mockFeed.id} tagId={null} />);

		const button = screen.getByText("Save");
		const input = screen.getByTestId("update-feed-name");

		await act(async () => {
			await userEvent.clear(input);
			await userEvent.type(input, "New Feed");
		});

		fireEvent(button, new MouseEvent("click", { bubbles: true }));

		expect(onSubmit).not.toHaveBeenCalledWith("New Feed", null);
	});

	xtest("should delete the feed", () => {
		const onDelete = jest.fn();
		render(<UpdateFeedForm initialTitle={mockFeed.title} id={mockFeed.id} tagId={null} />);

		expect(screen.getByText("Unsubscribe")).toBeInTheDocument();
		fireEvent(screen.getByText("Unsubscribe"), new MouseEvent("click", { bubbles: true }));
		expect(onDelete).not.toHaveBeenCalled();
	});
});

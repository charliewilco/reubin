import {
	act,
	render,
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SWRConfig } from "swr";
import { setupServer } from "msw/node";
import { CreateTagForm } from "$/components/create-tag";
import { TagRemovalList } from "$/components/tag-lists";

import type { Tag } from "@prisma/client";

const createTagMockFn = jest.fn();
const removeTagMockFn = jest.fn();

const tags: Tag[] = [
	{
		id: "1",
		title: "Test Tag #1",
		userId: "1",
	},
];

const server = setupServer();

beforeAll(() =>
	server.listen({
		onUnhandledRequest: "warn",
	})
);
afterEach(() => {
	server.resetHandlers();
});
afterAll(() => server.close());

xdescribe("Tags", () => {
	test("can create a tag", async () => {
		const user = userEvent.setup();

		render(<CreateTagForm />);

		await act(async () => {
			await user.type(screen.getByRole("textbox"), "Test Tag #2");
			await user.click(screen.getByText("Submit"));
		});

		expect(createTagMockFn).toHaveBeenCalledWith("Test Tag #2");

		await waitFor(() => {
			expect(screen.getByRole("textbox")).toHaveValue("");
		});
	});

	test("can delete a tag", async () => {
		const user = userEvent.setup();

		render(
			<SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
				<TagRemovalList />
			</SWRConfig>
		);

		await waitForElementToBeRemoved(screen.getByRole("alert"));
		expect(screen.getByRole("list")).toBeInTheDocument();

		await act(async () => {
			await user.click(screen.getAllByLabelText("Remove Tag")[0]);
		});

		expect(removeTagMockFn).toHaveBeenCalledWith("1");
	});
});

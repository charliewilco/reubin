import {
	act,
	render,
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SWRConfig } from "swr";
import { graphql } from "msw";
import { setupServer } from "msw/node";
import { CreateTagForm } from "../src/components/create-tag";
import { TagRemovalList } from "../src/components/tag-lists";
import type {
	AllTagsQuery,
	CreateTagMutation,
	CreateTagMutationVariables,
	RemoveTagMutation,
	RemoveTagMutationVariables,
	TagInfoFragment,
} from "../src/lib/__generated__";

const createTagMockFn = jest.fn();
const removeTagMockFn = jest.fn();

const tags: TagInfoFragment[] = [
	{
		__typename: "Tag",
		id: "1",
		title: "Test Tag #1",
	},
];

const server = setupServer(
	graphql.query<AllTagsQuery>("AllTags", (_req, res, ctx) => {
		return res(
			ctx.data({
				tags,
			})
		);
	}),
	graphql.mutation<CreateTagMutation, CreateTagMutationVariables>(
		"CreateTag",
		(req, res, ctx) => {
			createTagMockFn(req.variables.name);
			const newTag: TagInfoFragment = {
				__typename: "Tag",
				id: "2",
				title: req.variables.name,
			};
			tags.push(newTag);
			return res(
				ctx.data({
					addTag: newTag,
				})
			);
		}
	),
	graphql.mutation<RemoveTagMutation, RemoveTagMutationVariables>(
		"RemoveTag",
		(req, res, ctx) => {
			removeTagMockFn(req.variables.id);

			return res(
				ctx.data({
					removeTag: {
						__typename: "Tag",
						id: "1",
						title: "Test Tag #1",
					},
				})
			);
		}
	)
);

beforeAll(() =>
	server.listen({
		onUnhandledRequest: "warn",
	})
);
afterEach(() => {
	server.resetHandlers();
});
afterAll(() => server.close());

describe("Tags", () => {
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

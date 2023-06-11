import { GraphQLClient } from "graphql-request";
import type { RequestConfig } from "graphql-request/build/esm/types";
import {
	AllTagsDocument,
	CreateFeedDocument,
	EntriesByFeedFilterDocument,
	EntryFilter,
	GetFeedByIdDocument,
	IndividualEntryDocument,
	MarkAsReadDocument,
	RefreshFeedDocument,
	RemoveFeedDocument,
	UpdateFeedTitleDocument,
	type AllTagsQuery,
	type CreateFeedMutation,
	type CreateFeedMutationVariables,
	type EntriesByFeedFilterQuery,
	type EntriesByFeedFilterQueryVariables,
	type GetFeedByIdQuery,
	type GetFeedByIdQueryVariables,
	type IndividualEntryQuery,
	type IndividualEntryQueryVariables,
	type MarkAsReadMutation,
	type MarkAsReadMutationVariables,
	type RefreshFeedMutation,
	type RefreshFeedMutationVariables,
	type RemoveFeedMutation,
	type RemoveTagMutationVariables,
	type UpdateFeedInput,
	type UpdateFeedTitleMutation,
	type UpdateFeedTitleMutationVariables,
} from "./__generated__";
function getGraphQLEndpoint() {
	const fallbackURL = "http://localhost:3000/graphql";
	if (process.env.NODE_ENV === "test") {
		return "http://localhost:3000/graphql";
	} else if (!process.env.BROWSER) {
		return "http://localhost:3000/graphql";
	} else {
		return fallbackURL;
	}
}

let options: RequestConfig = {};

if (process.env.NODE_ENV !== "test") {
	options.fetch = fetch;
}

const client = new GraphQLClient(getGraphQLEndpoint(), options);

export const setHeaders = (token: string) => {
	client.setHeader("Authorization", token);
};

export const getEntry = async (id: string) =>
	client.request<IndividualEntryQuery, IndividualEntryQueryVariables>(
		IndividualEntryDocument,
		{ id }
	);

export const getFeed = async (id: string | null) => {
	if (id === null) {
		return;
	}

	return client.request<GetFeedByIdQuery, GetFeedByIdQueryVariables>(GetFeedByIdDocument, {
		id,
	});
};

export const getEntriesFromFeed = async (feedID: string, filter?: EntryFilter) =>
	client.request<EntriesByFeedFilterQuery, EntriesByFeedFilterQueryVariables>(
		EntriesByFeedFilterDocument,
		{
			feedID,
			filter,
		}
	);

export const getAllTags = async () => client.request<AllTagsQuery>(AllTagsDocument);

export const markAsRead = async (entryID: string) =>
	client.request<MarkAsReadMutation, MarkAsReadMutationVariables>(MarkAsReadDocument, {
		id: entryID,
	});

export const addFeed = async (url: string) =>
	client.request<CreateFeedMutation, CreateFeedMutationVariables>(CreateFeedDocument, { url });

export const refreshFeed = async (feedID: string) =>
	client.request<RefreshFeedMutation, RefreshFeedMutationVariables>(RefreshFeedDocument, {
		id: feedID,
	});

export const removeFeed = async (feedID: string) =>
	client.request<RemoveFeedMutation, RemoveTagMutationVariables>(RemoveFeedDocument, {
		id: feedID,
	});

export const updateFeedTitle = async (id: string, input?: UpdateFeedInput) =>
	client.request<UpdateFeedTitleMutation, UpdateFeedTitleMutationVariables>(
		UpdateFeedTitleDocument,
		{
			input,
			id,
		}
	);

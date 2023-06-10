import { GraphQLClient } from "graphql-request";
import type { RequestConfig } from "graphql-request/build/esm/types";
import { AuthToken } from "./auth-token";
import {
	AllTagsDocument,
	CreateFeedDocument,
	CreateTagDocument,
	EntriesByFeedFilterDocument,
	EntryFilter,
	GetFeedByIdDocument,
	GetFeedsDocument,
	IndividualEntryDocument,
	LoginDocument,
	MarkAsReadDocument,
	MeDocument,
	RefreshFeedDocument,
	RegisterDocument,
	RemoveFeedDocument,
	RemoveTagDocument,
	UpdateFeedTitleDocument,
	type AllTagsQuery,
	type CreateFeedMutation,
	type CreateFeedMutationVariables,
	type CreateTagMutation,
	type CreateTagMutationVariables,
	type EntriesByFeedFilterQuery,
	type EntriesByFeedFilterQueryVariables,
	type GetFeedByIdQuery,
	type GetFeedByIdQueryVariables,
	type GetFeedsQuery,
	type IndividualEntryQuery,
	type IndividualEntryQueryVariables,
	type LoginMutation,
	type LoginMutationVariables,
	type MarkAsReadMutation,
	type MarkAsReadMutationVariables,
	type MeQuery,
	type MeQueryVariables,
	type RefreshFeedMutation,
	type RefreshFeedMutationVariables,
	type RegisterMutation,
	type RegisterMutationVariables,
	type RemoveFeedMutation,
	type RemoveTagMutation,
	type RemoveTagMutationVariables,
	type UpdateFeedInput,
	type UpdateFeedTitleMutation,
	type UpdateFeedTitleMutationVariables,
} from "./__generated__";
import { getGraphQLEndpoint } from "./url";

let options: RequestConfig = {};

if (process.env.NODE_ENV !== "test") {
	options.fetch = fetch;
}

const client = new GraphQLClient(getGraphQLEndpoint(), options);

export const setHeaders = (token: string) => {
	client.setHeader("Authorization", token);
};

export function initalizeHeaders(cb: (token: string) => void) {
	const token = AuthToken.new.get();

	if (token !== null) {
		setHeaders(token);
		cb(token);
	}
}

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

export const getFeeds = async () => client.request<GetFeedsQuery>(GetFeedsDocument);

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

export const addTag = async (name: string) =>
	client.request<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, {
		name,
	});

export const removeTag = async (id: string) =>
	client.request<RemoveTagMutation, RemoveTagMutationVariables>(RemoveTagDocument, {
		id,
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
export const login = async (email: string, password: string) =>
	client.request<LoginMutation, LoginMutationVariables>(LoginDocument, {
		email,
		password: window.btoa(password),
	});

export const register = async (email: string, password: string) =>
	client.request<RegisterMutation, RegisterMutationVariables>(RegisterDocument, {
		email,
		password: window.btoa(password),
	});

export const me = async () => client.request<MeQuery, MeQueryVariables>(MeDocument);

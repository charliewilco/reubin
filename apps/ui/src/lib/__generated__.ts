import { GraphQLClient } from "graphql-request";
import * as Dom from "graphql-request/dist/types.dom";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	Date: any;
};

export type Activity = {
	__typename?: "Activity";
	starred: Array<Maybe<Scalars["Int"]>>;
	unread: Array<Maybe<Scalars["Int"]>>;
};

export type Entry = {
	__typename?: "Entry";
	author?: Maybe<Scalars["String"]>;
	/** HTML String */
	content?: Maybe<Scalars["String"]>;
	created_at?: Maybe<Scalars["Date"]>;
	favorite: Scalars["Boolean"];
	feed_id: Scalars["ID"];
	id: Scalars["ID"];
	published?: Maybe<Scalars["Date"]>;
	title: Scalars["String"];
	unread: Scalars["Boolean"];
	url?: Maybe<Scalars["String"]>;
};

export enum EntryFilter {
	All = "ALL",
	Favorited = "FAVORITED",
	Unread = "UNREAD",
}

export type Feed = {
	__typename?: "Feed";
	feedURL: Scalars["String"];
	id: Scalars["ID"];
	lastFetched: Scalars["Date"];
	link: Scalars["String"];
	tag?: Maybe<Scalars["ID"]>;
	title: Scalars["String"];
};

export type Mutation = {
	__typename?: "Mutation";
	addFeed: Feed;
	addTag: Tag;
	createUser: ReturnedUser;
	login: ReturnedUser;
	markAsFavorite: Entry;
	markAsRead: Entry;
	refreshFeed: Array<Entry>;
	removeFeed: Feed;
	removeTag: Tag;
	updateFeed: Feed;
};

export type MutationAddFeedArgs = {
	url: Scalars["String"];
};

export type MutationAddTagArgs = {
	name: Scalars["String"];
};

export type MutationCreateUserArgs = {
	email: Scalars["String"];
	password: Scalars["String"];
};

export type MutationLoginArgs = {
	email: Scalars["String"];
	password: Scalars["String"];
};

export type MutationMarkAsFavoriteArgs = {
	favorite: Scalars["Boolean"];
	id: Scalars["ID"];
};

export type MutationMarkAsReadArgs = {
	id: Scalars["ID"];
};

export type MutationRefreshFeedArgs = {
	id: Scalars["ID"];
};

export type MutationRemoveFeedArgs = {
	id: Scalars["ID"];
};

export type MutationRemoveTagArgs = {
	id: Scalars["ID"];
};

export type MutationUpdateFeedArgs = {
	fields?: InputMaybe<UpdateFeedInput>;
	id: Scalars["ID"];
};

export type Query = {
	__typename?: "Query";
	entries: Array<Entry>;
	entry: Entry;
	feed: Feed;
	feeds: Array<Maybe<Feed>>;
	me: User;
	tags: Array<Maybe<Tag>>;
};

export type QueryEntriesArgs = {
	feed_id: Scalars["ID"];
	filter?: InputMaybe<EntryFilter>;
};

export type QueryEntryArgs = {
	id: Scalars["ID"];
};

export type QueryFeedArgs = {
	id: Scalars["ID"];
};

export type QueryFeedsArgs = {
	tag_id?: InputMaybe<Scalars["ID"]>;
};

export type ReturnedUser = {
	__typename?: "ReturnedUser";
	token: Scalars["String"];
	user: User;
};

export type Tag = {
	__typename?: "Tag";
	id: Scalars["ID"];
	title: Scalars["String"];
};

export type UpdateFeedInput = {
	tagID?: InputMaybe<Scalars["ID"]>;
	title?: InputMaybe<Scalars["String"]>;
};

export type UpdateUserInput = {
	displayName?: InputMaybe<Scalars["String"]>;
	refreshInterval?: InputMaybe<Scalars["Int"]>;
};

export type User = {
	__typename?: "User";
	avatarColor?: Maybe<Scalars["Int"]>;
	displayName?: Maybe<Scalars["String"]>;
	email: Scalars["String"];
	id: Scalars["ID"];
	refreshInterval: Scalars["Int"];
};

export type EntriesByFeedFilterQueryVariables = Exact<{
	feedID: Scalars["ID"];
	filter?: InputMaybe<EntryFilter>;
}>;

export type EntriesByFeedFilterQuery = {
	__typename?: "Query";
	entries: Array<{
		__typename?: "Entry";
		title: string;
		content?: string | null;
		id: string;
		unread: boolean;
		published?: any | null;
	}>;
};

export type EntriesByFeedQueryVariables = Exact<{
	id: Scalars["ID"];
}>;

export type EntriesByFeedQuery = {
	__typename?: "Query";
	entries: Array<{
		__typename?: "Entry";
		title: string;
		content?: string | null;
		id: string;
		unread: boolean;
		published?: any | null;
	}>;
};

export type UnreadEntriesQueryVariables = Exact<{
	feedID: Scalars["ID"];
}>;

export type UnreadEntriesQuery = {
	__typename?: "Query";
	entries: Array<{
		__typename?: "Entry";
		title: string;
		content?: string | null;
		id: string;
		unread: boolean;
		published?: any | null;
	}>;
};

export type FavoriteEntriesQueryVariables = Exact<{
	feedID: Scalars["ID"];
}>;

export type FavoriteEntriesQuery = {
	__typename?: "Query";
	entries: Array<{
		__typename?: "Entry";
		title: string;
		content?: string | null;
		id: string;
		unread: boolean;
		published?: any | null;
	}>;
};

export type IndividualEntryQueryVariables = Exact<{
	id: Scalars["ID"];
}>;

export type IndividualEntryQuery = {
	__typename?: "Query";
	entry: {
		__typename?: "Entry";
		id: string;
		published?: any | null;
		content?: string | null;
		title: string;
		unread: boolean;
	};
};

export type MarkAsReadMutationVariables = Exact<{
	id: Scalars["ID"];
}>;

export type MarkAsReadMutation = {
	__typename?: "Mutation";
	markAsRead: { __typename?: "Entry"; title: string; content?: string | null; id: string };
};

export type GetFeedsQueryVariables = Exact<{ [key: string]: never }>;

export type GetFeedsQuery = {
	__typename?: "Query";
	feeds: Array<{
		__typename?: "Feed";
		id: string;
		title: string;
		link: string;
		feedURL: string;
		tag?: string | null;
	} | null>;
	tags: Array<{ __typename?: "Tag"; id: string; title: string } | null>;
};

export type GetFeedByIdQueryVariables = Exact<{
	id: Scalars["ID"];
}>;

export type GetFeedByIdQuery = {
	__typename?: "Query";
	feed: {
		__typename?: "Feed";
		id: string;
		title: string;
		link: string;
		feedURL: string;
		tag?: string | null;
	};
};

export type CreateFeedMutationVariables = Exact<{
	url: Scalars["String"];
}>;

export type CreateFeedMutation = {
	__typename?: "Mutation";
	addFeed: {
		__typename?: "Feed";
		id: string;
		title: string;
		link: string;
		feedURL: string;
		tag?: string | null;
	};
};

export type RefreshFeedMutationVariables = Exact<{
	id: Scalars["ID"];
}>;

export type RefreshFeedMutation = {
	__typename?: "Mutation";
	refreshFeed: Array<{
		__typename?: "Entry";
		title: string;
		content?: string | null;
		id: string;
		unread: boolean;
		published?: any | null;
	}>;
};

export type RemoveFeedMutationVariables = Exact<{
	id: Scalars["ID"];
}>;

export type RemoveFeedMutation = {
	__typename?: "Mutation";
	removeFeed: {
		__typename?: "Feed";
		id: string;
		title: string;
		link: string;
		feedURL: string;
		tag?: string | null;
	};
};

export type UpdateFeedTitleMutationVariables = Exact<{
	input?: InputMaybe<UpdateFeedInput>;
	id: Scalars["ID"];
}>;

export type UpdateFeedTitleMutation = {
	__typename?: "Mutation";
	updateFeed: {
		__typename?: "Feed";
		id: string;
		title: string;
		link: string;
		feedURL: string;
		tag?: string | null;
	};
};

export type FeedDetailsFragment = {
	__typename?: "Feed";
	id: string;
	title: string;
	link: string;
	feedURL: string;
	tag?: string | null;
};

export type TagInfoFragment = { __typename?: "Tag"; id: string; title: string };

export type EntryDetailsFragment = {
	__typename?: "Entry";
	title: string;
	content?: string | null;
	id: string;
	unread: boolean;
	published?: any | null;
};

export type AllTagsQueryVariables = Exact<{ [key: string]: never }>;

export type AllTagsQuery = {
	__typename?: "Query";
	tags: Array<{ __typename?: "Tag"; id: string; title: string } | null>;
};

export type CreateTagMutationVariables = Exact<{
	name: Scalars["String"];
}>;

export type CreateTagMutation = {
	__typename?: "Mutation";
	addTag: { __typename?: "Tag"; id: string; title: string };
};

export type RemoveTagMutationVariables = Exact<{
	id: Scalars["ID"];
}>;

export type RemoveTagMutation = {
	__typename?: "Mutation";
	removeTag: { __typename?: "Tag"; id: string; title: string };
};

export type LoginMutationVariables = Exact<{
	email: Scalars["String"];
	password: Scalars["String"];
}>;

export type LoginMutation = {
	__typename?: "Mutation";
	login: {
		__typename?: "ReturnedUser";
		token: string;
		user: { __typename?: "User"; id: string; email: string };
	};
};

export type RegisterMutationVariables = Exact<{
	email: Scalars["String"];
	password: Scalars["String"];
}>;

export type RegisterMutation = {
	__typename?: "Mutation";
	createUser: {
		__typename?: "ReturnedUser";
		token: string;
		user: { __typename?: "User"; id: string; email: string };
	};
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
	__typename?: "Query";
	me: {
		__typename?: "User";
		id: string;
		email: string;
		displayName?: string | null;
		refreshInterval: number;
		avatarColor?: number | null;
	};
};

export const FeedDetailsFragmentDoc = gql`
	fragment FeedDetails on Feed {
		id
		title
		link
		feedURL
		tag
	}
`;
export const TagInfoFragmentDoc = gql`
	fragment TagInfo on Tag {
		id
		title
	}
`;
export const EntryDetailsFragmentDoc = gql`
	fragment EntryDetails on Entry {
		title
		content
		id
		unread
		published
	}
`;
export const EntriesByFeedFilterDocument = gql`
	query EntriesByFeedFilter($feedID: ID!, $filter: EntryFilter) {
		entries(feed_id: $feedID, filter: $filter) {
			...EntryDetails
		}
	}
	${EntryDetailsFragmentDoc}
`;
export const EntriesByFeedDocument = gql`
	query EntriesByFeed($id: ID!) {
		entries(feed_id: $id) {
			...EntryDetails
		}
	}
	${EntryDetailsFragmentDoc}
`;
export const UnreadEntriesDocument = gql`
	query UnreadEntries($feedID: ID!) {
		entries(feed_id: $feedID, filter: UNREAD) {
			...EntryDetails
		}
	}
	${EntryDetailsFragmentDoc}
`;
export const FavoriteEntriesDocument = gql`
	query FavoriteEntries($feedID: ID!) {
		entries(feed_id: $feedID, filter: FAVORITED) {
			...EntryDetails
		}
	}
	${EntryDetailsFragmentDoc}
`;
export const IndividualEntryDocument = gql`
	query IndividualEntry($id: ID!) {
		entry(id: $id) {
			id
			published
			content
			title
			unread
		}
	}
`;
export const MarkAsReadDocument = gql`
	mutation MarkAsRead($id: ID!) {
		markAsRead(id: $id) {
			title
			content
			id
		}
	}
`;
export const GetFeedsDocument = gql`
	query GetFeeds {
		feeds {
			...FeedDetails
		}
		tags {
			...TagInfo
		}
	}
	${FeedDetailsFragmentDoc}
	${TagInfoFragmentDoc}
`;
export const GetFeedByIdDocument = gql`
	query GetFeedById($id: ID!) {
		feed(id: $id) {
			...FeedDetails
		}
	}
	${FeedDetailsFragmentDoc}
`;
export const CreateFeedDocument = gql`
	mutation CreateFeed($url: String!) {
		addFeed(url: $url) {
			...FeedDetails
		}
	}
	${FeedDetailsFragmentDoc}
`;
export const RefreshFeedDocument = gql`
	mutation RefreshFeed($id: ID!) {
		refreshFeed(id: $id) {
			...EntryDetails
		}
	}
	${EntryDetailsFragmentDoc}
`;
export const RemoveFeedDocument = gql`
	mutation RemoveFeed($id: ID!) {
		removeFeed(id: $id) {
			...FeedDetails
		}
	}
	${FeedDetailsFragmentDoc}
`;
export const UpdateFeedTitleDocument = gql`
	mutation UpdateFeedTitle($input: UpdateFeedInput, $id: ID!) {
		updateFeed(id: $id, fields: $input) {
			...FeedDetails
		}
	}
	${FeedDetailsFragmentDoc}
`;
export const AllTagsDocument = gql`
	query AllTags {
		tags {
			...TagInfo
		}
	}
	${TagInfoFragmentDoc}
`;
export const CreateTagDocument = gql`
	mutation CreateTag($name: String!) {
		addTag(name: $name) {
			id
			title
		}
	}
`;
export const RemoveTagDocument = gql`
	mutation RemoveTag($id: ID!) {
		removeTag(id: $id) {
			...TagInfo
		}
	}
	${TagInfoFragmentDoc}
`;
export const LoginDocument = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				id
				email
			}
		}
	}
`;
export const RegisterDocument = gql`
	mutation Register($email: String!, $password: String!) {
		createUser(email: $email, password: $password) {
			token
			user {
				id
				email
			}
		}
	}
`;
export const MeDocument = gql`
	query Me {
		me {
			id
			email
			displayName
			refreshInterval
			avatarColor
		}
	}
`;

export type SdkFunctionWrapper = <T>(
	action: (requestHeaders?: Record<string, string>) => Promise<T>,
	operationName: string,
	operationType?: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) =>
	action();

export function getSdk(
	client: GraphQLClient,
	withWrapper: SdkFunctionWrapper = defaultWrapper
) {
	return {
		EntriesByFeedFilter(
			variables: EntriesByFeedFilterQueryVariables,
			requestHeaders?: Dom.RequestInit["headers"]
		): Promise<EntriesByFeedFilterQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<EntriesByFeedFilterQuery>(EntriesByFeedFilterDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders,
					}),
				"EntriesByFeedFilter",
				"query"
			);
		},
		EntriesByFeed(
			variables: EntriesByFeedQueryVariables,
			requestHeaders?: Dom.RequestInit["headers"]
		): Promise<EntriesByFeedQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<EntriesByFeedQuery>(EntriesByFeedDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders,
					}),
				"EntriesByFeed",
				"query"
			);
		},
		UnreadEntries(
			variables: UnreadEntriesQueryVariables,
			requestHeaders?: Dom.RequestInit["headers"]
		): Promise<UnreadEntriesQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<UnreadEntriesQuery>(UnreadEntriesDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders,
					}),
				"UnreadEntries",
				"query"
			);
		},
		FavoriteEntries(
			variables: FavoriteEntriesQueryVariables,
			requestHeaders?: Dom.RequestInit["headers"]
		): Promise<FavoriteEntriesQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<FavoriteEntriesQuery>(FavoriteEntriesDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders,
					}),
				"FavoriteEntries",
				"query"
			);
		},
		IndividualEntry(
			variables: IndividualEntryQueryVariables,
			requestHeaders?: Dom.RequestInit["headers"]
		): Promise<IndividualEntryQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<IndividualEntryQuery>(IndividualEntryDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders,
					}),
				"IndividualEntry",
				"query"
			);
		},
		MarkAsRead(
			variables: MarkAsReadMutationVariables,
			requestHeaders?: Dom.RequestInit["headers"]
		): Promise<MarkAsReadMutation> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<MarkAsReadMutation>(MarkAsReadDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders,
					}),
				"MarkAsRead",
				"mutation"
			);
		},
		GetFeeds(
			variables?: GetFeedsQueryVariables,
			requestHeaders?: Dom.RequestInit["headers"]
		): Promise<GetFeedsQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetFeedsQuery>(GetFeedsDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders,
					}),
				"GetFeeds",
				"query"
			);
		},
		GetFeedById(
			variables: GetFeedByIdQueryVariables,
			requestHeaders?: Dom.RequestInit["headers"]
		): Promise<GetFeedByIdQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetFeedByIdQuery>(GetFeedByIdDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders,
					}),
				"GetFeedById",
				"query"
			);
		},
		CreateFeed(
			variables: CreateFeedMutationVariables,
			requestHeaders?: Dom.RequestInit["headers"]
		): Promise<CreateFeedMutation> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<CreateFeedMutation>(CreateFeedDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders,
					}),
				"CreateFeed",
				"mutation"
			);
		},
		RefreshFeed(
			variables: RefreshFeedMutationVariables,
			requestHeaders?: Dom.RequestInit["headers"]
		): Promise<RefreshFeedMutation> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<RefreshFeedMutation>(RefreshFeedDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders,
					}),
				"RefreshFeed",
				"mutation"
			);
		},
		RemoveFeed(
			variables: RemoveFeedMutationVariables,
			requestHeaders?: Dom.RequestInit["headers"]
		): Promise<RemoveFeedMutation> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<RemoveFeedMutation>(RemoveFeedDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders,
					}),
				"RemoveFeed",
				"mutation"
			);
		},
		UpdateFeedTitle(
			variables: UpdateFeedTitleMutationVariables,
			requestHeaders?: Dom.RequestInit["headers"]
		): Promise<UpdateFeedTitleMutation> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<UpdateFeedTitleMutation>(UpdateFeedTitleDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders,
					}),
				"UpdateFeedTitle",
				"mutation"
			);
		},
		AllTags(
			variables?: AllTagsQueryVariables,
			requestHeaders?: Dom.RequestInit["headers"]
		): Promise<AllTagsQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<AllTagsQuery>(AllTagsDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders,
					}),
				"AllTags",
				"query"
			);
		},
		CreateTag(
			variables: CreateTagMutationVariables,
			requestHeaders?: Dom.RequestInit["headers"]
		): Promise<CreateTagMutation> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<CreateTagMutation>(CreateTagDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders,
					}),
				"CreateTag",
				"mutation"
			);
		},
		RemoveTag(
			variables: RemoveTagMutationVariables,
			requestHeaders?: Dom.RequestInit["headers"]
		): Promise<RemoveTagMutation> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<RemoveTagMutation>(RemoveTagDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders,
					}),
				"RemoveTag",
				"mutation"
			);
		},
		Login(
			variables: LoginMutationVariables,
			requestHeaders?: Dom.RequestInit["headers"]
		): Promise<LoginMutation> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<LoginMutation>(LoginDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders,
					}),
				"Login",
				"mutation"
			);
		},
		Register(
			variables: RegisterMutationVariables,
			requestHeaders?: Dom.RequestInit["headers"]
		): Promise<RegisterMutation> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<RegisterMutation>(RegisterDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders,
					}),
				"Register",
				"mutation"
			);
		},
		Me(
			variables?: MeQueryVariables,
			requestHeaders?: Dom.RequestInit["headers"]
		): Promise<MeQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<MeQuery>(MeDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders,
					}),
				"Me",
				"query"
			);
		},
	};
}
export type Sdk = ReturnType<typeof getSdk>;

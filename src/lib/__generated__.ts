import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
	[_ in K]?: never;
};
export type Incremental<T> =
	| T
	| { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string | number; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
	Date: { input: any; output: any };
};

export type Activity = {
	__typename?: "Activity";
	starred: Array<Maybe<Scalars["Int"]["output"]>>;
	unread: Array<Maybe<Scalars["Int"]["output"]>>;
};

export type Entry = {
	__typename?: "Entry";
	author?: Maybe<Scalars["String"]["output"]>;
	/** HTML String */
	content?: Maybe<Scalars["String"]["output"]>;
	created_at?: Maybe<Scalars["Date"]["output"]>;
	favorite: Scalars["Boolean"]["output"];
	feed_id: Scalars["ID"]["output"];
	id: Scalars["ID"]["output"];
	published?: Maybe<Scalars["Date"]["output"]>;
	title: Scalars["String"]["output"];
	unread: Scalars["Boolean"]["output"];
	url?: Maybe<Scalars["String"]["output"]>;
};

export enum EntryFilter {
	All = "ALL",
	Favorited = "FAVORITED",
	Unread = "UNREAD",
}

export type Feed = {
	__typename?: "Feed";
	feedURL: Scalars["String"]["output"];
	id: Scalars["ID"]["output"];
	lastFetched: Scalars["Date"]["output"];
	link: Scalars["String"]["output"];
	tag?: Maybe<Scalars["ID"]["output"]>;
	title: Scalars["String"]["output"];
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
	url: Scalars["String"]["input"];
};

export type MutationAddTagArgs = {
	name: Scalars["String"]["input"];
};

export type MutationCreateUserArgs = {
	email: Scalars["String"]["input"];
	password: Scalars["String"]["input"];
};

export type MutationLoginArgs = {
	email: Scalars["String"]["input"];
	password: Scalars["String"]["input"];
};

export type MutationMarkAsFavoriteArgs = {
	favorite: Scalars["Boolean"]["input"];
	id: Scalars["ID"]["input"];
};

export type MutationMarkAsReadArgs = {
	id: Scalars["ID"]["input"];
};

export type MutationRefreshFeedArgs = {
	id: Scalars["ID"]["input"];
};

export type MutationRemoveFeedArgs = {
	id: Scalars["ID"]["input"];
};

export type MutationRemoveTagArgs = {
	id: Scalars["ID"]["input"];
};

export type MutationUpdateFeedArgs = {
	fields?: InputMaybe<UpdateFeedInput>;
	id: Scalars["ID"]["input"];
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
	feed_id: Scalars["ID"]["input"];
	filter?: InputMaybe<EntryFilter>;
};

export type QueryEntryArgs = {
	id: Scalars["ID"]["input"];
};

export type QueryFeedArgs = {
	id: Scalars["ID"]["input"];
};

export type QueryFeedsArgs = {
	tag_id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ReturnedUser = {
	__typename?: "ReturnedUser";
	token: Scalars["String"]["output"];
	user: User;
};

export type Tag = {
	__typename?: "Tag";
	id: Scalars["ID"]["output"];
	title: Scalars["String"]["output"];
};

export type UpdateFeedInput = {
	tagID?: InputMaybe<Scalars["ID"]["input"]>;
	title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateUserInput = {
	displayName?: InputMaybe<Scalars["String"]["input"]>;
	refreshInterval?: InputMaybe<Scalars["Int"]["input"]>;
};

export type User = {
	__typename?: "User";
	avatarColor?: Maybe<Scalars["Int"]["output"]>;
	displayName?: Maybe<Scalars["String"]["output"]>;
	email: Scalars["String"]["output"];
	id: Scalars["ID"]["output"];
	refreshInterval: Scalars["Int"]["output"];
};

export type EntriesByFeedFilterQueryVariables = Exact<{
	feedID: Scalars["ID"]["input"];
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
	id: Scalars["ID"]["input"];
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
	feedID: Scalars["ID"]["input"];
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
	feedID: Scalars["ID"]["input"];
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
	id: Scalars["ID"]["input"];
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
	id: Scalars["ID"]["input"];
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
	id: Scalars["ID"]["input"];
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
	url: Scalars["String"]["input"];
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
	id: Scalars["ID"]["input"];
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
	id: Scalars["ID"]["input"];
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
	id: Scalars["ID"]["input"];
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
	name: Scalars["String"]["input"];
}>;

export type CreateTagMutation = {
	__typename?: "Mutation";
	addTag: { __typename?: "Tag"; id: string; title: string };
};

export type RemoveTagMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveTagMutation = {
	__typename?: "Mutation";
	removeTag: { __typename?: "Tag"; id: string; title: string };
};

export type LoginMutationVariables = Exact<{
	email: Scalars["String"]["input"];
	password: Scalars["String"]["input"];
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
	email: Scalars["String"]["input"];
	password: Scalars["String"]["input"];
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

export const FeedDetailsFragmentDoc = {
	kind: "Document",
	definitions: [
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "FeedDetails" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Feed" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "id" } },
					{ kind: "Field", name: { kind: "Name", value: "title" } },
					{ kind: "Field", name: { kind: "Name", value: "link" } },
					{ kind: "Field", name: { kind: "Name", value: "feedURL" } },
					{ kind: "Field", name: { kind: "Name", value: "tag" } },
				],
			},
		},
	],
} as unknown as DocumentNode<FeedDetailsFragment, unknown>;
export const TagInfoFragmentDoc = {
	kind: "Document",
	definitions: [
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "TagInfo" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Tag" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "id" } },
					{ kind: "Field", name: { kind: "Name", value: "title" } },
				],
			},
		},
	],
} as unknown as DocumentNode<TagInfoFragment, unknown>;
export const EntryDetailsFragmentDoc = {
	kind: "Document",
	definitions: [
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "EntryDetails" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Entry" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "title" } },
					{ kind: "Field", name: { kind: "Name", value: "content" } },
					{ kind: "Field", name: { kind: "Name", value: "id" } },
					{ kind: "Field", name: { kind: "Name", value: "unread" } },
					{ kind: "Field", name: { kind: "Name", value: "published" } },
				],
			},
		},
	],
} as unknown as DocumentNode<EntryDetailsFragment, unknown>;
export const EntriesByFeedFilterDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "EntriesByFeedFilter" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "feedID" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
					},
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "filter" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "EntryFilter" } },
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "entries" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "feed_id" },
								value: { kind: "Variable", name: { kind: "Name", value: "feedID" } },
							},
							{
								kind: "Argument",
								name: { kind: "Name", value: "filter" },
								value: { kind: "Variable", name: { kind: "Name", value: "filter" } },
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "FragmentSpread", name: { kind: "Name", value: "EntryDetails" } },
							],
						},
					},
				],
			},
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "EntryDetails" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Entry" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "title" } },
					{ kind: "Field", name: { kind: "Name", value: "content" } },
					{ kind: "Field", name: { kind: "Name", value: "id" } },
					{ kind: "Field", name: { kind: "Name", value: "unread" } },
					{ kind: "Field", name: { kind: "Name", value: "published" } },
				],
			},
		},
	],
} as unknown as DocumentNode<EntriesByFeedFilterQuery, EntriesByFeedFilterQueryVariables>;
export const EntriesByFeedDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "EntriesByFeed" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "entries" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "feed_id" },
								value: { kind: "Variable", name: { kind: "Name", value: "id" } },
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "FragmentSpread", name: { kind: "Name", value: "EntryDetails" } },
							],
						},
					},
				],
			},
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "EntryDetails" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Entry" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "title" } },
					{ kind: "Field", name: { kind: "Name", value: "content" } },
					{ kind: "Field", name: { kind: "Name", value: "id" } },
					{ kind: "Field", name: { kind: "Name", value: "unread" } },
					{ kind: "Field", name: { kind: "Name", value: "published" } },
				],
			},
		},
	],
} as unknown as DocumentNode<EntriesByFeedQuery, EntriesByFeedQueryVariables>;
export const UnreadEntriesDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "UnreadEntries" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "feedID" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "entries" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "feed_id" },
								value: { kind: "Variable", name: { kind: "Name", value: "feedID" } },
							},
							{
								kind: "Argument",
								name: { kind: "Name", value: "filter" },
								value: { kind: "EnumValue", value: "UNREAD" },
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "FragmentSpread", name: { kind: "Name", value: "EntryDetails" } },
							],
						},
					},
				],
			},
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "EntryDetails" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Entry" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "title" } },
					{ kind: "Field", name: { kind: "Name", value: "content" } },
					{ kind: "Field", name: { kind: "Name", value: "id" } },
					{ kind: "Field", name: { kind: "Name", value: "unread" } },
					{ kind: "Field", name: { kind: "Name", value: "published" } },
				],
			},
		},
	],
} as unknown as DocumentNode<UnreadEntriesQuery, UnreadEntriesQueryVariables>;
export const FavoriteEntriesDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "FavoriteEntries" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "feedID" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "entries" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "feed_id" },
								value: { kind: "Variable", name: { kind: "Name", value: "feedID" } },
							},
							{
								kind: "Argument",
								name: { kind: "Name", value: "filter" },
								value: { kind: "EnumValue", value: "FAVORITED" },
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "FragmentSpread", name: { kind: "Name", value: "EntryDetails" } },
							],
						},
					},
				],
			},
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "EntryDetails" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Entry" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "title" } },
					{ kind: "Field", name: { kind: "Name", value: "content" } },
					{ kind: "Field", name: { kind: "Name", value: "id" } },
					{ kind: "Field", name: { kind: "Name", value: "unread" } },
					{ kind: "Field", name: { kind: "Name", value: "published" } },
				],
			},
		},
	],
} as unknown as DocumentNode<FavoriteEntriesQuery, FavoriteEntriesQueryVariables>;
export const IndividualEntryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "IndividualEntry" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "entry" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "id" },
								value: { kind: "Variable", name: { kind: "Name", value: "id" } },
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "id" } },
								{ kind: "Field", name: { kind: "Name", value: "published" } },
								{ kind: "Field", name: { kind: "Name", value: "content" } },
								{ kind: "Field", name: { kind: "Name", value: "title" } },
								{ kind: "Field", name: { kind: "Name", value: "unread" } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<IndividualEntryQuery, IndividualEntryQueryVariables>;
export const MarkAsReadDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "MarkAsRead" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "markAsRead" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "id" },
								value: { kind: "Variable", name: { kind: "Name", value: "id" } },
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "title" } },
								{ kind: "Field", name: { kind: "Name", value: "content" } },
								{ kind: "Field", name: { kind: "Name", value: "id" } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<MarkAsReadMutation, MarkAsReadMutationVariables>;
export const GetFeedsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "GetFeeds" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "feeds" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "FragmentSpread", name: { kind: "Name", value: "FeedDetails" } },
							],
						},
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "tags" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "FragmentSpread", name: { kind: "Name", value: "TagInfo" } },
							],
						},
					},
				],
			},
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "FeedDetails" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Feed" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "id" } },
					{ kind: "Field", name: { kind: "Name", value: "title" } },
					{ kind: "Field", name: { kind: "Name", value: "link" } },
					{ kind: "Field", name: { kind: "Name", value: "feedURL" } },
					{ kind: "Field", name: { kind: "Name", value: "tag" } },
				],
			},
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "TagInfo" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Tag" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "id" } },
					{ kind: "Field", name: { kind: "Name", value: "title" } },
				],
			},
		},
	],
} as unknown as DocumentNode<GetFeedsQuery, GetFeedsQueryVariables>;
export const GetFeedByIdDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "GetFeedById" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "feed" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "id" },
								value: { kind: "Variable", name: { kind: "Name", value: "id" } },
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "FragmentSpread", name: { kind: "Name", value: "FeedDetails" } },
							],
						},
					},
				],
			},
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "FeedDetails" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Feed" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "id" } },
					{ kind: "Field", name: { kind: "Name", value: "title" } },
					{ kind: "Field", name: { kind: "Name", value: "link" } },
					{ kind: "Field", name: { kind: "Name", value: "feedURL" } },
					{ kind: "Field", name: { kind: "Name", value: "tag" } },
				],
			},
		},
	],
} as unknown as DocumentNode<GetFeedByIdQuery, GetFeedByIdQueryVariables>;
export const CreateFeedDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "CreateFeed" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "url" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "addFeed" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "url" },
								value: { kind: "Variable", name: { kind: "Name", value: "url" } },
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "FragmentSpread", name: { kind: "Name", value: "FeedDetails" } },
							],
						},
					},
				],
			},
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "FeedDetails" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Feed" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "id" } },
					{ kind: "Field", name: { kind: "Name", value: "title" } },
					{ kind: "Field", name: { kind: "Name", value: "link" } },
					{ kind: "Field", name: { kind: "Name", value: "feedURL" } },
					{ kind: "Field", name: { kind: "Name", value: "tag" } },
				],
			},
		},
	],
} as unknown as DocumentNode<CreateFeedMutation, CreateFeedMutationVariables>;
export const RefreshFeedDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "RefreshFeed" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "refreshFeed" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "id" },
								value: { kind: "Variable", name: { kind: "Name", value: "id" } },
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "FragmentSpread", name: { kind: "Name", value: "EntryDetails" } },
							],
						},
					},
				],
			},
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "EntryDetails" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Entry" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "title" } },
					{ kind: "Field", name: { kind: "Name", value: "content" } },
					{ kind: "Field", name: { kind: "Name", value: "id" } },
					{ kind: "Field", name: { kind: "Name", value: "unread" } },
					{ kind: "Field", name: { kind: "Name", value: "published" } },
				],
			},
		},
	],
} as unknown as DocumentNode<RefreshFeedMutation, RefreshFeedMutationVariables>;
export const RemoveFeedDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "RemoveFeed" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "removeFeed" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "id" },
								value: { kind: "Variable", name: { kind: "Name", value: "id" } },
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "FragmentSpread", name: { kind: "Name", value: "FeedDetails" } },
							],
						},
					},
				],
			},
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "FeedDetails" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Feed" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "id" } },
					{ kind: "Field", name: { kind: "Name", value: "title" } },
					{ kind: "Field", name: { kind: "Name", value: "link" } },
					{ kind: "Field", name: { kind: "Name", value: "feedURL" } },
					{ kind: "Field", name: { kind: "Name", value: "tag" } },
				],
			},
		},
	],
} as unknown as DocumentNode<RemoveFeedMutation, RemoveFeedMutationVariables>;
export const UpdateFeedTitleDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "UpdateFeedTitle" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "UpdateFeedInput" } },
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "updateFeed" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "id" },
								value: { kind: "Variable", name: { kind: "Name", value: "id" } },
							},
							{
								kind: "Argument",
								name: { kind: "Name", value: "fields" },
								value: { kind: "Variable", name: { kind: "Name", value: "input" } },
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "FragmentSpread", name: { kind: "Name", value: "FeedDetails" } },
							],
						},
					},
				],
			},
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "FeedDetails" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Feed" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "id" } },
					{ kind: "Field", name: { kind: "Name", value: "title" } },
					{ kind: "Field", name: { kind: "Name", value: "link" } },
					{ kind: "Field", name: { kind: "Name", value: "feedURL" } },
					{ kind: "Field", name: { kind: "Name", value: "tag" } },
				],
			},
		},
	],
} as unknown as DocumentNode<UpdateFeedTitleMutation, UpdateFeedTitleMutationVariables>;
export const AllTagsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "AllTags" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "tags" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "FragmentSpread", name: { kind: "Name", value: "TagInfo" } },
							],
						},
					},
				],
			},
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "TagInfo" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Tag" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "id" } },
					{ kind: "Field", name: { kind: "Name", value: "title" } },
				],
			},
		},
	],
} as unknown as DocumentNode<AllTagsQuery, AllTagsQueryVariables>;
export const CreateTagDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "CreateTag" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "addTag" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "name" },
								value: { kind: "Variable", name: { kind: "Name", value: "name" } },
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "id" } },
								{ kind: "Field", name: { kind: "Name", value: "title" } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<CreateTagMutation, CreateTagMutationVariables>;
export const RemoveTagDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "RemoveTag" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "removeTag" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "id" },
								value: { kind: "Variable", name: { kind: "Name", value: "id" } },
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "FragmentSpread", name: { kind: "Name", value: "TagInfo" } },
							],
						},
					},
				],
			},
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "TagInfo" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Tag" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "id" } },
					{ kind: "Field", name: { kind: "Name", value: "title" } },
				],
			},
		},
	],
} as unknown as DocumentNode<RemoveTagMutation, RemoveTagMutationVariables>;
export const LoginDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "Login" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "email" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
					},
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "password" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "login" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "email" },
								value: { kind: "Variable", name: { kind: "Name", value: "email" } },
							},
							{
								kind: "Argument",
								name: { kind: "Name", value: "password" },
								value: { kind: "Variable", name: { kind: "Name", value: "password" } },
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "token" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "user" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{ kind: "Field", name: { kind: "Name", value: "email" } },
										],
									},
								},
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "Register" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "email" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
					},
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "password" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "createUser" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "email" },
								value: { kind: "Variable", name: { kind: "Name", value: "email" } },
							},
							{
								kind: "Argument",
								name: { kind: "Name", value: "password" },
								value: { kind: "Variable", name: { kind: "Name", value: "password" } },
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "token" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "user" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{ kind: "Field", name: { kind: "Name", value: "email" } },
										],
									},
								},
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const MeDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "Me" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "me" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "id" } },
								{ kind: "Field", name: { kind: "Name", value: "email" } },
								{ kind: "Field", name: { kind: "Name", value: "displayName" } },
								{ kind: "Field", name: { kind: "Name", value: "refreshInterval" } },
								{ kind: "Field", name: { kind: "Name", value: "avatarColor" } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;

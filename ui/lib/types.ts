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
  title: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  addFeed: Feed;
  markAsFavorite: Entry;
  markAsRead: Entry;
  refreshFeed: Array<Entry>;
  removeFeed: Feed;
  updateFeed: Feed;
};

export type MutationAddFeedArgs = {
  url: Scalars["String"];
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

export type MutationUpdateFeedArgs = {
  id: Scalars["ID"];
  title: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  entries: Array<Entry>;
  entry: Entry;
  feed: Feed;
  feeds: Array<Maybe<Feed>>;
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

export type FeedDetailsFragment = {
  __typename?: "Feed";
  id: string;
  title: string;
  link: string;
  feedURL: string;
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
  } | null>;
};

export type EntryDetailsFragment = {
  __typename?: "Entry";
  title: string;
  content?: string | null;
  id: string;
  unread: boolean;
  published?: any | null;
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

export type CreateFeedMutationVariables = Exact<{
  url: Scalars["String"];
}>;

export type CreateFeedMutation = {
  __typename?: "Mutation";
  addFeed: { __typename?: "Feed"; id: string; title: string; link: string; feedURL: string };
};

export type MarkAsReadMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type MarkAsReadMutation = {
  __typename?: "Mutation";
  markAsRead: { __typename?: "Entry"; title: string; content?: string | null; id: string };
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
  };
};

export type UpdateFeedTitleMutationVariables = Exact<{
  title: Scalars["String"];
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
  };
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

export const FeedDetailsFragmentDoc = gql`
  fragment FeedDetails on Feed {
    id
    title
    link
    feedURL
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
export const GetFeedsDocument = gql`
  query GetFeeds {
    feeds {
      ...FeedDetails
    }
  }
  ${FeedDetailsFragmentDoc}
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
export const CreateFeedDocument = gql`
  mutation CreateFeed($url: String!) {
    addFeed(url: $url) {
      ...FeedDetails
    }
  }
  ${FeedDetailsFragmentDoc}
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
  mutation UpdateFeedTitle($title: String!, $id: ID!) {
    updateFeed(title: $title, id: $id) {
      ...FeedDetails
    }
  }
  ${FeedDetailsFragmentDoc}
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
  };
}
export type Sdk = ReturnType<typeof getSdk>;

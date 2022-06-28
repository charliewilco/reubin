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
  feed_id: Scalars["ID"];
  id: Scalars["ID"];
  published?: Maybe<Scalars["Date"]>;
  title?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

export enum EntryFilter {
  All = "ALL",
  Favorited = "FAVORITED",
  Unread = "UNREAD",
}

export type Feed = {
  __typename?: "Feed";
  id: Scalars["ID"];
  lastFetched: Scalars["Date"];
  link: Scalars["String"];
  title: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  addFeed: Feed;
  refreshFeed: Array<Maybe<Entry>>;
  removeFeed: Feed;
};

export type MutationAddFeedArgs = {
  url: Scalars["String"];
};

export type MutationRefreshFeedArgs = {
  id: Scalars["ID"];
};

export type MutationRemoveFeedArgs = {
  id: Scalars["ID"];
};

export type Query = {
  __typename?: "Query";
  entries: Array<Maybe<Entry>>;
  entry?: Maybe<Entry>;
  feed?: Maybe<Feed>;
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

export type FeedDetailsFragment = { __typename?: "Feed"; id: string; title: string };

export type GetFeedsQueryVariables = Exact<{ [key: string]: never }>;

export type GetFeedsQuery = {
  __typename?: "Query";
  feeds: Array<{ __typename?: "Feed"; id: string; title: string } | null>;
};

export type EntriesByFeedQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type EntriesByFeedQuery = {
  __typename?: "Query";
  entries: Array<{
    __typename?: "Entry";
    title?: string | null;
    content?: string | null;
    id: string;
  } | null>;
};

export type CreateFeedMutationVariables = Exact<{
  url: Scalars["String"];
}>;

export type CreateFeedMutation = {
  __typename?: "Mutation";
  addFeed: { __typename?: "Feed"; id: string; title: string };
};

export const FeedDetailsFragmentDoc = gql`
  fragment FeedDetails on Feed {
    id
    title
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
      title
      content
      id
    }
  }
`;
export const CreateFeedDocument = gql`
  mutation CreateFeed($url: String!) {
    addFeed(url: $url) {
      ...FeedDetails
    }
  }
  ${FeedDetailsFragmentDoc}
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
  };
}
export type Sdk = ReturnType<typeof getSdk>;

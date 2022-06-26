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

export type Feed = {
  __typename?: "Feed";
  id: Scalars["ID"];
  link: Scalars["String"];
  title: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  addFeed: Feed;
  refreshFeed: Array<Maybe<Feed>>;
  removeFeed: Feed;
  updateFeed: Feed;
};

export type MutationAddFeedArgs = {
  url: Scalars["String"];
};

export type MutationRefreshFeedArgs = {
  ids: Array<Scalars["ID"]>;
};

export type MutationRemoveFeedArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateFeedArgs = {
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
};

export type QueryEntryArgs = {
  id?: InputMaybe<Scalars["String"]>;
};

export type QueryFeedArgs = {
  id: Scalars["ID"];
};

export type GetFeedsQueryVariables = Exact<{ [key: string]: never }>;

export type GetFeedsQuery = {
  __typename?: "Query";
  feeds: Array<{ __typename?: "Feed"; id: string; title: string } | null>;
};

export const GetFeedsDocument = gql`
  query GetFeeds {
    feeds {
      id
      title
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
  };
}
export type Sdk = ReturnType<typeof getSdk>;

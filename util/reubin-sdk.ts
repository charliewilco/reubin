import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type IUnreadList = {
  __typename?: 'UnreadList';
  itemIDs: Array<Scalars['String']>;
};

export type ISubscriptions = {
  __typename?: 'Subscriptions';
  tags: Array<ITag>;
  untaggedFeeds: Array<IFeed>;
};

export enum IServices {
  Rss = 'RSS',
  Instapaper = 'INSTAPAPER',
  Feedbin = 'FEEDBIN'
}

export type IItem = {
  __typename?: 'Item';
  id: Scalars['String'];
  feed_id: Scalars['Int'];
  title: Scalars['String'];
  author: Maybe<Scalars['String']>;
  summary: Maybe<Scalars['String']>;
  content: Scalars['String'];
  url: Scalars['String'];
  extracted_content_url: Scalars['String'];
  published: Scalars['String'];
  created_at: Maybe<Scalars['String']>;
};

export type ITag = {
  __typename?: 'Tag';
  title: Scalars['String'];
  feeds: Array<Maybe<IFeed>>;
};

export type IFeed = {
  __typename?: 'Feed';
  url: Scalars['String'];
  site: Scalars['String'];
  name: Scalars['String'];
  id: Scalars['ID'];
  feed_id: Scalars['Float'];
};

export type IAuthResponse = {
  __typename?: 'AuthResponse';
  isValid: Scalars['Boolean'];
};

export type ISubscription = {
  __typename?: 'Subscription';
  feed: IFeed;
  items: Array<IItem>;
};

export type IQuery = {
  __typename?: 'Query';
  subscriptions: ISubscriptions;
  favorites: Array<Scalars['Float']>;
  unread: Array<Scalars['Float']>;
  entries: Array<IItem>;
  entry: IItem;
  /** Deprecated */
  subscription: ISubscription;
  bookmarks: Array<IItem>;
  /** Must be id not feed_id */
  feed: IFeed;
  product: Array<IItem>;
};


export type IQueryEntriesArgs = {
  page: Maybe<Scalars['Int']>;
};


export type IQueryEntryArgs = {
  id: Scalars['Float'];
};


export type IQuerySubscriptionArgs = {
  id: Scalars['Float'];
};


export type IQueryBookmarksArgs = {
  ids: Maybe<Array<Scalars['Float']>>;
};


export type IQueryFeedArgs = {
  id: Scalars['Float'];
};


export type IQueryProductArgs = {
  service: IServices;
  url: Scalars['String'];
};

export type IMutation = {
  __typename?: 'Mutation';
  bookmark: Maybe<IItem>;
  removeBookmark: Maybe<IItem>;
  markAsRead: Maybe<IItem>;
  markAsUnread: Maybe<IItem>;
  login: Maybe<IAuthResponse>;
};


export type IMutationBookmarkArgs = {
  id: Scalars['Float'];
};


export type IMutationRemoveBookmarkArgs = {
  id: Scalars['Float'];
};


export type IMutationMarkAsReadArgs = {
  id: Scalars['String'];
};


export type IMutationMarkAsUnreadArgs = {
  id: Scalars['String'];
};


export type IMutationLoginArgs = {
  hash: Scalars['String'];
};

export type ILocalRssQueryVariables = Exact<{
  url: Scalars['String'];
}>;


export type ILocalRssQuery = (
  { __typename?: 'Query' }
  & { product: Array<(
    { __typename?: 'Item' }
    & Pick<IItem, 'url' | 'title' | 'published'>
  )> }
);


export const LocalRssDocument = gql`
    query LocalRSS($url: String!) {
  product(service: RSS, url: $url) {
    url
    title
    published
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    LocalRSS(variables: ILocalRssQueryVariables): Promise<ILocalRssQuery> {
      return withWrapper(() => client.request<ILocalRssQuery>(print(LocalRssDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
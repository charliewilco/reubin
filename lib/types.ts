import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type IAuthResponse = {
  __typename?: 'AuthResponse';
  isValid: Scalars['Boolean'];
};

export type IFeed = {
  __typename?: 'Feed';
  url: Scalars['String'];
  site: Scalars['String'];
  name: Scalars['String'];
  id: Scalars['ID'];
  feed_id: Scalars['Float'];
};

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

export type IParsedEntries = {
  __typename?: 'ParsedEntries';
  link: Scalars['String'];
  guid: Scalars['String'];
  title: Scalars['String'];
  pubDate: Scalars['String'];
  creator: Scalars['String'];
  content: Scalars['String'];
  isoDate: Scalars['String'];
  categories: Array<Maybe<Scalars['String']>>;
  summary: Maybe<Scalars['String']>;
  contentSnippet: Maybe<Scalars['String']>;
  enclosureUrl: Maybe<Scalars['String']>;
  enclosureLength: Maybe<Scalars['Int']>;
  enclosureType: Maybe<Scalars['String']>;
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
  parsedEntries: Array<Maybe<IParsedEntries>>;
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


export type IQueryParsedEntriesArgs = {
  url: Scalars['String'];
};

export enum IServices {
  Rss = 'RSS',
  Instapaper = 'INSTAPAPER',
  Feedbin = 'FEEDBIN'
}

export type ISubscription = {
  __typename?: 'Subscription';
  feed: IFeed;
  items: Array<IItem>;
};

export type ISubscriptions = {
  __typename?: 'Subscriptions';
  tags: Array<ITag>;
  untaggedFeeds: Array<IFeed>;
};

export type ITag = {
  __typename?: 'Tag';
  title: Scalars['String'];
  feeds: Array<Maybe<IFeed>>;
};

export type IUnreadList = {
  __typename?: 'UnreadList';
  itemIDs: Array<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = ResolversObject<{
  AuthResponse: ResolverTypeWrapper<IAuthResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Feed: ResolverTypeWrapper<IFeed>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Item: ResolverTypeWrapper<IItem>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  ParsedEntries: ResolverTypeWrapper<IParsedEntries>;
  Query: ResolverTypeWrapper<{}>;
  Services: IServices;
  Subscription: ResolverTypeWrapper<{}>;
  Subscriptions: ResolverTypeWrapper<ISubscriptions>;
  Tag: ResolverTypeWrapper<ITag>;
  UnreadList: ResolverTypeWrapper<IUnreadList>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = ResolversObject<{
  AuthResponse: IAuthResponse;
  Boolean: Scalars['Boolean'];
  Feed: IFeed;
  String: Scalars['String'];
  ID: Scalars['ID'];
  Float: Scalars['Float'];
  Item: IItem;
  Int: Scalars['Int'];
  Mutation: {};
  ParsedEntries: IParsedEntries;
  Query: {};
  Subscription: {};
  Subscriptions: ISubscriptions;
  Tag: ITag;
  UnreadList: IUnreadList;
}>;

export type IAuthResponseResolvers<ContextType = any, ParentType extends IResolversParentTypes['AuthResponse'] = IResolversParentTypes['AuthResponse']> = ResolversObject<{
  isValid: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IFeedResolvers<ContextType = any, ParentType extends IResolversParentTypes['Feed'] = IResolversParentTypes['Feed']> = ResolversObject<{
  url: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  site: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  feed_id: Resolver<IResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IItemResolvers<ContextType = any, ParentType extends IResolversParentTypes['Item'] = IResolversParentTypes['Item']> = ResolversObject<{
  id: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  feed_id: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  title: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  author: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  summary: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  content: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  url: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  extracted_content_url: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  published: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  created_at: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IMutationResolvers<ContextType = any, ParentType extends IResolversParentTypes['Mutation'] = IResolversParentTypes['Mutation']> = ResolversObject<{
  bookmark: Resolver<Maybe<IResolversTypes['Item']>, ParentType, ContextType, RequireFields<IMutationBookmarkArgs, 'id'>>;
  removeBookmark: Resolver<Maybe<IResolversTypes['Item']>, ParentType, ContextType, RequireFields<IMutationRemoveBookmarkArgs, 'id'>>;
  markAsRead: Resolver<Maybe<IResolversTypes['Item']>, ParentType, ContextType, RequireFields<IMutationMarkAsReadArgs, 'id'>>;
  markAsUnread: Resolver<Maybe<IResolversTypes['Item']>, ParentType, ContextType, RequireFields<IMutationMarkAsUnreadArgs, 'id'>>;
  login: Resolver<Maybe<IResolversTypes['AuthResponse']>, ParentType, ContextType, RequireFields<IMutationLoginArgs, 'hash'>>;
}>;

export type IParsedEntriesResolvers<ContextType = any, ParentType extends IResolversParentTypes['ParsedEntries'] = IResolversParentTypes['ParsedEntries']> = ResolversObject<{
  link: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  guid: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  title: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  pubDate: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  creator: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  content: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  isoDate: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  categories: Resolver<Array<Maybe<IResolversTypes['String']>>, ParentType, ContextType>;
  summary: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  contentSnippet: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  enclosureUrl: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  enclosureLength: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>;
  enclosureType: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IQueryResolvers<ContextType = any, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = ResolversObject<{
  subscriptions: Resolver<IResolversTypes['Subscriptions'], ParentType, ContextType>;
  favorites: Resolver<Array<IResolversTypes['Float']>, ParentType, ContextType>;
  unread: Resolver<Array<IResolversTypes['Float']>, ParentType, ContextType>;
  entries: Resolver<Array<IResolversTypes['Item']>, ParentType, ContextType, RequireFields<IQueryEntriesArgs, never>>;
  entry: Resolver<IResolversTypes['Item'], ParentType, ContextType, RequireFields<IQueryEntryArgs, 'id'>>;
  subscription: Resolver<IResolversTypes['Subscription'], ParentType, ContextType, RequireFields<IQuerySubscriptionArgs, 'id'>>;
  bookmarks: Resolver<Array<IResolversTypes['Item']>, ParentType, ContextType, RequireFields<IQueryBookmarksArgs, never>>;
  feed: Resolver<IResolversTypes['Feed'], ParentType, ContextType, RequireFields<IQueryFeedArgs, 'id'>>;
  product: Resolver<Array<IResolversTypes['Item']>, ParentType, ContextType, RequireFields<IQueryProductArgs, 'service' | 'url'>>;
  parsedEntries: Resolver<Array<Maybe<IResolversTypes['ParsedEntries']>>, ParentType, ContextType, RequireFields<IQueryParsedEntriesArgs, 'url'>>;
}>;

export type ISubscriptionResolvers<ContextType = any, ParentType extends IResolversParentTypes['Subscription'] = IResolversParentTypes['Subscription']> = ResolversObject<{
  feed: SubscriptionResolver<IResolversTypes['Feed'], "feed", ParentType, ContextType>;
  items: SubscriptionResolver<Array<IResolversTypes['Item']>, "items", ParentType, ContextType>;
}>;

export type ISubscriptionsResolvers<ContextType = any, ParentType extends IResolversParentTypes['Subscriptions'] = IResolversParentTypes['Subscriptions']> = ResolversObject<{
  tags: Resolver<Array<IResolversTypes['Tag']>, ParentType, ContextType>;
  untaggedFeeds: Resolver<Array<IResolversTypes['Feed']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ITagResolvers<ContextType = any, ParentType extends IResolversParentTypes['Tag'] = IResolversParentTypes['Tag']> = ResolversObject<{
  title: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  feeds: Resolver<Array<Maybe<IResolversTypes['Feed']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IUnreadListResolvers<ContextType = any, ParentType extends IResolversParentTypes['UnreadList'] = IResolversParentTypes['UnreadList']> = ResolversObject<{
  itemIDs: Resolver<Array<IResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IResolvers<ContextType = any> = ResolversObject<{
  AuthResponse: IAuthResponseResolvers<ContextType>;
  Feed: IFeedResolvers<ContextType>;
  Item: IItemResolvers<ContextType>;
  Mutation: IMutationResolvers<ContextType>;
  ParsedEntries: IParsedEntriesResolvers<ContextType>;
  Query: IQueryResolvers<ContextType>;
  Subscription: ISubscriptionResolvers<ContextType>;
  Subscriptions: ISubscriptionsResolvers<ContextType>;
  Tag: ITagResolvers<ContextType>;
  UnreadList: IUnreadListResolvers<ContextType>;
}>;



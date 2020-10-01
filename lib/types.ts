import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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

export type IItem = {
  __typename?: 'Item';
  id: Scalars['Float'];
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
  unread: IUnreadList;
  entries: Array<IItem>;
  entry: IItem;
  subscription: ISubscription;
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

export type IMutation = {
  __typename?: 'Mutation';
  login: Maybe<IAuthResponse>;
};


export type IMutationLoginArgs = {
  hash: Scalars['String'];
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

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  UnreadList: ResolverTypeWrapper<IUnreadList>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscriptions: ResolverTypeWrapper<ISubscriptions>;
  Item: ResolverTypeWrapper<IItem>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Tag: ResolverTypeWrapper<ITag>;
  Feed: ResolverTypeWrapper<IFeed>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  AuthResponse: ResolverTypeWrapper<IAuthResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Subscription: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = ResolversObject<{
  UnreadList: IUnreadList;
  String: Scalars['String'];
  Subscriptions: ISubscriptions;
  Item: IItem;
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  Tag: ITag;
  Feed: IFeed;
  ID: Scalars['ID'];
  AuthResponse: IAuthResponse;
  Boolean: Scalars['Boolean'];
  Subscription: {};
  Query: {};
  Mutation: {};
}>;

export type IUnreadListResolvers<ContextType = any, ParentType extends IResolversParentTypes['UnreadList'] = IResolversParentTypes['UnreadList']> = ResolversObject<{
  itemIDs: Resolver<Array<IResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ISubscriptionsResolvers<ContextType = any, ParentType extends IResolversParentTypes['Subscriptions'] = IResolversParentTypes['Subscriptions']> = ResolversObject<{
  tags: Resolver<Array<IResolversTypes['Tag']>, ParentType, ContextType>;
  untaggedFeeds: Resolver<Array<IResolversTypes['Feed']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type IItemResolvers<ContextType = any, ParentType extends IResolversParentTypes['Item'] = IResolversParentTypes['Item']> = ResolversObject<{
  id: Resolver<IResolversTypes['Float'], ParentType, ContextType>;
  feed_id: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  title: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  author: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  summary: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  content: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  url: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  extracted_content_url: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  published: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  created_at: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ITagResolvers<ContextType = any, ParentType extends IResolversParentTypes['Tag'] = IResolversParentTypes['Tag']> = ResolversObject<{
  title: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  feeds: Resolver<Array<Maybe<IResolversTypes['Feed']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type IFeedResolvers<ContextType = any, ParentType extends IResolversParentTypes['Feed'] = IResolversParentTypes['Feed']> = ResolversObject<{
  url: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  site: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  feed_id: Resolver<IResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type IAuthResponseResolvers<ContextType = any, ParentType extends IResolversParentTypes['AuthResponse'] = IResolversParentTypes['AuthResponse']> = ResolversObject<{
  isValid: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ISubscriptionResolvers<ContextType = any, ParentType extends IResolversParentTypes['Subscription'] = IResolversParentTypes['Subscription']> = ResolversObject<{
  feed: SubscriptionResolver<IResolversTypes['Feed'], "feed", ParentType, ContextType>;
  items: SubscriptionResolver<Array<IResolversTypes['Item']>, "items", ParentType, ContextType>;
}>;

export type IQueryResolvers<ContextType = any, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = ResolversObject<{
  subscriptions: Resolver<IResolversTypes['Subscriptions'], ParentType, ContextType>;
  unread: Resolver<IResolversTypes['UnreadList'], ParentType, ContextType>;
  entries: Resolver<Array<IResolversTypes['Item']>, ParentType, ContextType, RequireFields<IQueryEntriesArgs, never>>;
  entry: Resolver<IResolversTypes['Item'], ParentType, ContextType, RequireFields<IQueryEntryArgs, 'id'>>;
  subscription: Resolver<IResolversTypes['Subscription'], ParentType, ContextType, RequireFields<IQuerySubscriptionArgs, 'id'>>;
}>;

export type IMutationResolvers<ContextType = any, ParentType extends IResolversParentTypes['Mutation'] = IResolversParentTypes['Mutation']> = ResolversObject<{
  login: Resolver<Maybe<IResolversTypes['AuthResponse']>, ParentType, ContextType, RequireFields<IMutationLoginArgs, 'hash'>>;
}>;

export type IResolvers<ContextType = any> = ResolversObject<{
  UnreadList: IUnreadListResolvers<ContextType>;
  Subscriptions: ISubscriptionsResolvers<ContextType>;
  Item: IItemResolvers<ContextType>;
  Tag: ITagResolvers<ContextType>;
  Feed: IFeedResolvers<ContextType>;
  AuthResponse: IAuthResponseResolvers<ContextType>;
  Subscription: ISubscriptionResolvers<ContextType>;
  Query: IQueryResolvers<ContextType>;
  Mutation: IMutationResolvers<ContextType>;
}>;



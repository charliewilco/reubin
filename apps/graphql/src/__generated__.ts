import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
	[P in K]-?: NonNullable<T[P]>;
};
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs
> {
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

export type SubscriptionResolver<
	TResult,
	TKey extends string,
	TParent = {},
	TContext = {},
	TArgs = {}
> =
	| ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
	obj: T,
	context: TContext,
	info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Activity: ResolverTypeWrapper<Activity>;
	Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
	Date: ResolverTypeWrapper<Scalars["Date"]>;
	Entry: ResolverTypeWrapper<Entry>;
	EntryFilter: EntryFilter;
	Feed: ResolverTypeWrapper<Feed>;
	ID: ResolverTypeWrapper<Scalars["ID"]>;
	Int: ResolverTypeWrapper<Scalars["Int"]>;
	Mutation: ResolverTypeWrapper<{}>;
	Query: ResolverTypeWrapper<{}>;
	ReturnedUser: ResolverTypeWrapper<ReturnedUser>;
	String: ResolverTypeWrapper<Scalars["String"]>;
	Tag: ResolverTypeWrapper<Tag>;
	UpdateFeedInput: UpdateFeedInput;
	UpdateUserInput: UpdateUserInput;
	User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Activity: Activity;
	Boolean: Scalars["Boolean"];
	Date: Scalars["Date"];
	Entry: Entry;
	Feed: Feed;
	ID: Scalars["ID"];
	Int: Scalars["Int"];
	Mutation: {};
	Query: {};
	ReturnedUser: ReturnedUser;
	String: Scalars["String"];
	Tag: Tag;
	UpdateFeedInput: UpdateFeedInput;
	UpdateUserInput: UpdateUserInput;
	User: User;
};

export type ActivityResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["Activity"] = ResolversParentTypes["Activity"]
> = {
	starred?: Resolver<Array<Maybe<ResolversTypes["Int"]>>, ParentType, ContextType>;
	unread?: Resolver<Array<Maybe<ResolversTypes["Int"]>>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
	name: "Date";
}

export type EntryResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["Entry"] = ResolversParentTypes["Entry"]
> = {
	author?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	content?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	created_at?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
	favorite?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
	feed_id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	published?: Resolver<Maybe<ResolversTypes["Date"]>, ParentType, ContextType>;
	title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	unread?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
	url?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["Feed"] = ResolversParentTypes["Feed"]
> = {
	feedURL?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	lastFetched?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
	link?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	tag?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
	title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
	addFeed?: Resolver<
		ResolversTypes["Feed"],
		ParentType,
		ContextType,
		RequireFields<MutationAddFeedArgs, "url">
	>;
	addTag?: Resolver<
		ResolversTypes["Tag"],
		ParentType,
		ContextType,
		RequireFields<MutationAddTagArgs, "name">
	>;
	createUser?: Resolver<
		ResolversTypes["ReturnedUser"],
		ParentType,
		ContextType,
		RequireFields<MutationCreateUserArgs, "email" | "password">
	>;
	login?: Resolver<
		ResolversTypes["ReturnedUser"],
		ParentType,
		ContextType,
		RequireFields<MutationLoginArgs, "email" | "password">
	>;
	markAsFavorite?: Resolver<
		ResolversTypes["Entry"],
		ParentType,
		ContextType,
		RequireFields<MutationMarkAsFavoriteArgs, "favorite" | "id">
	>;
	markAsRead?: Resolver<
		ResolversTypes["Entry"],
		ParentType,
		ContextType,
		RequireFields<MutationMarkAsReadArgs, "id">
	>;
	refreshFeed?: Resolver<
		Array<ResolversTypes["Entry"]>,
		ParentType,
		ContextType,
		RequireFields<MutationRefreshFeedArgs, "id">
	>;
	removeFeed?: Resolver<
		ResolversTypes["Feed"],
		ParentType,
		ContextType,
		RequireFields<MutationRemoveFeedArgs, "id">
	>;
	removeTag?: Resolver<
		ResolversTypes["Tag"],
		ParentType,
		ContextType,
		RequireFields<MutationRemoveTagArgs, "id">
	>;
	updateFeed?: Resolver<
		ResolversTypes["Feed"],
		ParentType,
		ContextType,
		RequireFields<MutationUpdateFeedArgs, "id">
	>;
};

export type QueryResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
	entries?: Resolver<
		Array<ResolversTypes["Entry"]>,
		ParentType,
		ContextType,
		RequireFields<QueryEntriesArgs, "feed_id">
	>;
	entry?: Resolver<
		ResolversTypes["Entry"],
		ParentType,
		ContextType,
		RequireFields<QueryEntryArgs, "id">
	>;
	feed?: Resolver<
		ResolversTypes["Feed"],
		ParentType,
		ContextType,
		RequireFields<QueryFeedArgs, "id">
	>;
	feeds?: Resolver<
		Array<Maybe<ResolversTypes["Feed"]>>,
		ParentType,
		ContextType,
		Partial<QueryFeedsArgs>
	>;
	me?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
	tags?: Resolver<Array<Maybe<ResolversTypes["Tag"]>>, ParentType, ContextType>;
};

export type ReturnedUserResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["ReturnedUser"] = ResolversParentTypes["ReturnedUser"]
> = {
	token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["Tag"] = ResolversParentTypes["Tag"]
> = {
	id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
	avatarColor?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
	displayName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	refreshInterval?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
	Activity?: ActivityResolvers<ContextType>;
	Date?: GraphQLScalarType;
	Entry?: EntryResolvers<ContextType>;
	Feed?: FeedResolvers<ContextType>;
	Mutation?: MutationResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
	ReturnedUser?: ReturnedUserResolvers<ContextType>;
	Tag?: TagResolvers<ContextType>;
	User?: UserResolvers<ContextType>;
};

import { Query } from "./queries";
import { Mutation } from "./mutations";
import { ResolverContext } from "./context";
import {
  IResolvers,
  ISubscriptionsResolvers,
  IUnreadListResolvers,
  IItemResolvers,
  ITagResolvers,
  IFeedResolvers,
  IAuthResponseResolvers,
  ISubscriptionResolvers,
} from "./types";

const UnreadList: IUnreadListResolvers = {
  itemIDs(parent) {
    return parent.itemIDs;
  },
};

const Subscriptions: ISubscriptionsResolvers = {
  tags(parent) {
    return parent.tags;
  },
  untaggedFeeds(parent) {
    return parent.untaggedFeeds;
  },
};

const Subscription: ISubscriptionResolvers = {
  feed(parent) {
    return parent.feed;
  },
  items(parent) {
    return parent.items;
  },
};

const Item: IItemResolvers = {
  title(parent) {
    return parent.title;
  },
  feed_id(parent) {
    return parent.feed_id;
  },
  id(parent) {
    return parent.id;
  },
  author(parent) {
    return parent.author;
  },
  summary(parent) {
    return parent.summary;
  },
  content(parent) {
    return parent.content;
  },
  url(parent) {
    return parent.url;
  },
  extracted_content_url(parent) {
    return parent.extracted_content_url;
  },
  published(parent) {
    return parent.published;
  },
  created_at(parent) {
    return parent.created_at;
  },
};

const Tag: ITagResolvers = {
  title(parent) {
    return parent.title;
  },
  feeds(parent) {
    return parent.feeds;
  },
};

const Feed: IFeedResolvers = {
  url(parent) {
    return parent.url;
  },
  site(parent) {
    return parent.site;
  },
  name(parent) {
    return parent.name;
  },
  id(parent) {
    return parent.id;
  },
  feed_id(parent) {
    return parent.feed_id;
  },
};

const AuthResponse: IAuthResponseResolvers = {
  isValid(parent) {
    return parent.isValid;
  },
};

export const resolvers: IResolvers<ResolverContext> = {
  Query,
  Mutation,
  UnreadList,
  Subscriptions,
  Tag,
  Item,
  Feed,
  AuthResponse,
  Subscription,
};

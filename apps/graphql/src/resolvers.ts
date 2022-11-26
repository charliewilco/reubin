import { Feed } from "@prisma/client";

import {
	type MutationResolvers,
	type QueryResolvers,
	type Resolvers,
	EntryFilter,
} from "./__generated__";
import type { Context } from "./context";
import { FeedController } from "./model/feeds";
import { EntryController } from "./model/entry";
import { Models } from "./model";
import { services } from "./services";

// TODO: Create tag object
// TODO: Stripe integration

const m = new Models(services);

/**
 * TODO:
 * - recently read
 **/
const query: QueryResolvers<Context> = {
	async tags(_, __, { token }) {
		if (token !== null) {
			return m.tag.getAll(token);
		} else {
			throw new Error("This node requires Authorization token");
		}
	},
	async feeds(_parent, { tag_id }, { token }) {
		if (token !== null) {
			return tag_id ? m.feeds.getByTagID(tag_id, token) : m.feeds.getAll(token);
		} else {
			throw new Error("This node requires Authorization token");
		}
	},
	async feed(_parent, { id }, { token }) {
		if (token !== null) {
			return m.feeds.getById(id, token);
		} else {
			throw new Error("This node requires Authorization token");
		}
	},
	async entry(_parent, { id }, {}) {
		const entry = await services.orm.entry.findUnique({
			where: {
				id,
			},
		});

		if (entry === null) {
			throw new Error("Entry not found.");
		}

		return EntryController.fromORM(entry);
	},
	async entries(_parent, { feed_id, filter }, {}) {
		let args: any = { feedId: feed_id };

		if (filter === EntryFilter.Favorited) {
			args.favorite = true;
		}

		if (filter === EntryFilter.Unread) {
			args.unread = true;
		}

		const entries = await services.orm.entry.findMany({
			where: args,
		});

		return entries.map((value) => EntryController.fromORM(value));
	},
	async me(_, __, { token }) {
		if (token !== null) {
			return m.users.getMe(token);
		} else {
			throw new Error("This node requires Authorization token");
		}
	},
};

const mutation: MutationResolvers<Context> = {
	async addFeed(_parent, { url }, { token }) {
		if (token !== null) {
			return m.feeds.add(url, token);
		} else {
			throw new Error("This node requires Authorization token");
		}
	},
	async addTag(_parent, { name }, { token }) {
		if (token !== null) {
			return m.tag.add(name, token);
		} else {
			throw new Error("This node requires Authorization token");
		}
	},
	async removeFeed(_parent, { id }, {}) {
		await services.orm.entry.deleteMany({
			where: {
				feedId: id,
			},
		});
		const feed = await services.orm.feed.delete({
			where: {
				id,
			},
		});
		return feed;
	},
	async removeTag(_parent, { id }, {}) {
		const tag = await services.orm.tag.delete({
			where: {
				id,
			},
		});

		return {
			id: tag.id,
			title: tag.title,
		};
	},
	async refreshFeed(_parent, { id }, {}) {
		const feed = await services.orm.feed.findUnique({
			where: {
				id,
			},
		});

		if (feed === null) {
			throw new Error("Couldn't find feed");
		}

		const { data: rssText } = await FeedController.getFeedFromDirectURL(feed.feedURL);
		const { items } = await services.rss.parse(rssText);

		const lastFetchedISO = feed.lastFetched.toISOString();

		const entries: ReturnType<typeof EntryController.fromRSS>[] = [];

		for (const item of items) {
			if (item) {
				if (lastFetchedISO < item.isoDate!) {
					entries.push(EntryController.fromRSS(item, feed.id));
				}
			}
		}

		await services.orm.entry.createMany({
			data: entries,
		});

		const _ = await services.orm.entry.findMany({
			where: {
				feedId: id,
				pubDate: {
					gte: feed.lastFetched,
				},
			},
		});

		await services.orm.feed.update({
			where: {
				id,
			},
			data: {
				lastFetched: new Date(Date.now()),
			},
		});

		return _.map((value) => EntryController.fromORM(value));
	},
	async markAsRead(_parent, { id }, {}) {
		const entry = await services.orm.entry.update({
			where: {
				id,
			},
			data: {
				unread: false,
			},
		});
		if (entry === null) {
			throw new Error("Entry not updated");
		}

		return EntryController.fromORM(entry);
	},
	async markAsFavorite(_parent, { id, favorite }, {}) {
		const entry = await services.orm.entry.update({
			where: {
				id,
			},
			data: {
				favorite,
			},
		});
		if (entry === null) {
			throw new Error("Entry not updated");
		}

		return EntryController.fromORM(entry);
	},
	async updateFeed(_parent, { id, fields }, {}) {
		try {
			const data: Partial<Feed> = {};

			if (fields?.title) {
				data.title = fields.title;
			}

			if (fields?.tagID) {
				data.tagId = fields.tagID;
			}

			const feed = await services.orm.feed.update({
				where: {
					id,
				},
				data,
			});

			if (feed === null) {
				throw new Error("Feed not updated");
			}

			return FeedController.fromORM(feed);
		} catch (error: any) {
			throw new Error(error);
		}
	},
	async createUser(_, { email, password }) {
		return m.users.create(email, password);
	},
	async login(_, { email, password }) {
		return m.users.verify(email, password);
	},
};

export const resolvers: Resolvers<Context> = {
	Query: query,
	Mutation: mutation,
};

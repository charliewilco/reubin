import type { Feed } from "@prisma/client";
import axios from "axios";
import { EntryController } from "./feed-entry-controller";
import { ORM } from "./orm";
import { RSSKit } from "./rss";

export class FeedController {
	static async getFeedFromDirectURL(url: string) {
		return axios.get<string>(url, {
			headers: {
				"Content-Type": "text/plain",
			},
		});
	}
	static fromORM(feed: Feed) {
		return {
			...feed,
			tag: feed.tagId,
		};
	}
	private rss: RSSKit<{}, {}> = new RSSKit();

	async add(url: string, userId: string) {
		try {
			const { data } = await FeedController.getFeedFromDirectURL(url);
			const parsed = await this.rss.parse(data);
			const feed = await ORM.feed.create({
				data: {
					title: parsed.title ?? "Untitled Feed",
					link: parsed.link ?? url,
					feedURL: parsed.feedUrl ?? url,
					lastFetched: new Date(Date.now()),
					userId,
				},
			});

			let created =
				parsed.items?.map((value) => EntryController.fromRSS(value, feed.id)) ?? [];
			if (created.length > 0)
				await ORM.entry.createMany({
					data: created,
				});

			return feed;
		} catch (err: any) {
			throw new Error(err);
		}
	}

	async getById(id: string, userId: string) {
		const feed = await ORM.feed.findUnique({
			where: {
				id,
			},
		});

		if (feed === null || feed.userId !== userId) {
			throw new Error("Feed not found");
		}

		return feed;
	}

	async getByTagID(id: string, userId: string) {
		const feeds = await ORM.feed.findMany({
			where: {
				userId,
				tagId: id,
			},
		});

		const converted = [];
		for (let index = 0; index < feeds.length; index++) {
			converted.push(FeedController.fromORM(feeds[index]));
		}

		return converted;
	}

	async getAll(userId: string) {
		const feeds = await ORM.feed.findMany({
			where: {
				userId,
			},
		});
		const converted = [];
		for (let index = 0; index < feeds.length; index++) {
			converted.push(FeedController.fromORM(feeds[index]));
		}

		return converted;
	}

	async remove(id: string, userId: string) {
		const feed = await ORM.feed.findUnique({
			where: {
				id,
			},
		});

		if (feed === null || feed.userId !== userId) {
			throw new Error("Feed not found");
		}

		await ORM.entry.deleteMany({
			where: {
				feedId: id,
			},
		});

		const removed = await ORM.feed.delete({
			where: {
				id,
			},
		});

		return removed;
	}
}

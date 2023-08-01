// @ts-check

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import RSSParser from "rss-parser";
import arg from "arg";

const args = arg({
	"--email": String,
});

const EMAIL = args["--email"] ?? "charlespeters42@gmail.com";
const PASSWORD = "P@ssw0rd";

const orm = new PrismaClient();
const parser = new RSSParser();

/**
 * @typedef FeedListItem
 * @type {object}
 * @property {string} url
 * @property {string} title
 */

/** @type {FeedListItem[]} */
const TECH_FEEDS = [
	{
		title: "Reddit JavaScript",
		url: "https://www.reddit.com/r/javascript/.rss",
	},
	{
		title: "Sanity",
		url: "https://www.sanity.io/feed/rss",
	},
	{
		title: "Discord",
		url: "https://discord.com/blog/rss.xml",
	},
	{
		title: "Filecoin",
		url: "https://filecoin.io/blog/feed/index.xml",
	},
	{
		title: "Chainlink",
		url: "https://blog.chain.link/feed/",
	},
	{
		title: "Vercel News",
		url: "https://vercel.com/atom",
	},
];

/** @type {FeedListItem[]} */
const NEW_FEEDS = [
	{
		url: "https://www.vox.com/rss/index.xml",
		title: "Vox",
	},
	{
		url: "https://www.out.com/rss.xml",
		title: "Out.com",
	},
	{
		url: "https://www.buzzfeed.com/world.xml",
		title: "BuzzFeed World News",
	},
	{
		url: "https://thedailywhat.cheezburger.com/rss",
		title: "Daily What",
	},
];

/**
 *
 * @param {String} title
 * @param {FeedListItem[]} feeds
 * @param {String} userId
 */

async function createFeedWithTag(title, feeds, userId) {
	const tag = await orm.tag.create({
		data: {
			title,
			userId: userId,
		},
	});

	for await (const _feed of feeds) {
		const feed = await orm.feed.create({
			data: {
				title: _feed.title,
				feedURL: _feed.url,
				link: _feed.url,
				userId,
				tagId: tag.id,
			},
		});

		const parsedFeed = await parser.parseURL(_feed.url);

		const entries = await orm.entry.createMany({
			data: parsedFeed.items.map((rssItem) => {
				return {
					title: rssItem.title ?? "Untitled Entry",
					content: rssItem.content ?? "",
					feedId: feed.id,
					pubDate: new Date(rssItem.pubDate ?? Date.now()),
				};
			}),
		});

		console.log({ feed, entries });
	}

	console.log({ tag });
}

async function clearAll() {
	const models = Reflect.ownKeys(orm).filter(
		(key) => key[0] !== "_" && key[0] !== "$" && typeof key !== "symbol"
	);

	console.log({ models });

	return Promise.all(
		models.map((modelKey) => {
			return orm[modelKey].deleteMany();
		})
	);
}

/**
 *
 * @param {String} email
 * @param {String} password
 */
async function seedProject(email, password) {
	await clearAll().then(() => console.log("Cleared all data"));

	const hashed = await bcrypt.hash(password, 10);

	const user = await orm.user.create({
		data: {
			email,
			password: hashed,
			name: "...",
		},
	});

	console.log({ user });

	await createFeedWithTag("Tech", TECH_FEEDS, user.id);
	await createFeedWithTag("News", NEW_FEEDS, user.id);

	await createFeedWithTag(
		"Personal",
		[
			{
				title: "Charlie Wilco",
				url: "https://charliewil.co/rss",
			},
		],
		user.id
	);
}

try {
	await seedProject(EMAIL, PASSWORD);
} catch (error) {
	console.error(error);
	process.exit(1);
} finally {
	await orm.$disconnect();
}

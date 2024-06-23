import { describe, expect, mock, test } from "bun:test";
import type { RSSItem } from "@xmlxyz/rsskit";
import {
	favorite,
	feedBelongsToUser,
	fromRSS,
	getByFeed,
	getById,
	markAsUnread,
} from "./entry";

// Mocking the Prisma Service
mock.module("../services", () => {
	return {
		Services: {
			db: {
				entry: {
					update: mock(),
					count: mock(),
					findUnique: mock(),
					findMany: mock(),
				},
			},
		},
	};
});

const servicesPath = "../services";

describe("EntryController", () => {
	test("should transform RSSItem to LeanEntry", () => {
		const rssItem: RSSItem = {
			title: "Test Title",
			content: "Test Content",
			link: "https://test.link",
			pubDate: "2023-08-25",
		};
		const feedId = "test-feed-id";

		const leanEntry = fromRSS(rssItem, feedId);

		expect(leanEntry.title).toBe(rssItem.title);
		expect(leanEntry.content).toBe(rssItem.content);
		expect(leanEntry.link).toBe(rssItem.link);
		expect(leanEntry.feedId).toBe(feedId);
		expect(leanEntry.pubDate).toEqual(new Date(rssItem.pubDate!));
	});

	test("should mark entry as favorite", async () => {
		const id = "test-id";
		const mockEntry = { id, favorite: true };

		// Mock the call to Prisma's update method
		const { Services } = require(servicesPath);
		Services.db.entry.update.mockResolvedValue(mockEntry);

		const updatedEntry = await favorite(id);

		expect(updatedEntry).toEqual(mockEntry);
		expect(Services.db.entry.update).toHaveBeenCalledWith({
			where: { id },
			data: { favorite: true },
		});
	});

	test("should verify if a feed belongs to a user", async () => {
		const feedId = "test-feed-id";
		const userId = "test-user-id";

		const { Services } = require(servicesPath);
		Services.db.entry.count.mockResolvedValue(1); // indicate that feed belongs to user

		const result = await feedBelongsToUser(feedId, userId);

		expect(result).toBe(true);
		expect(Services.db.entry.count).toHaveBeenCalledWith({
			where: {
				id: feedId,
				feed: {
					userId,
				},
			},
		});
	});

	test("should mark entry as unread", async () => {
		const id = "test-id";
		const mockEntry = { id, unread: true };

		const { Services } = require(servicesPath);
		Services.db.entry.update.mockResolvedValue(mockEntry);

		const updatedEntry = await markAsUnread(id);

		expect(updatedEntry).toEqual(mockEntry);
		expect(Services.db.entry.update).toHaveBeenCalledWith({
			where: { id },
			data: { unread: true },
		});
	});

	test("should retrieve an entry by ID", async () => {
		const id = "test-id";
		const mockEntry = { id, title: "Test Entry" };

		const { Services } = require(servicesPath);
		Services.db.entry.findUnique.mockResolvedValue(mockEntry);

		const entry = await getById(id);

		expect(entry).toEqual(mockEntry);
		expect(Services.db.entry.findUnique).toHaveBeenCalledWith({ where: { id } });
	});

	test("should throw an error if entry is not found", async () => {
		const id = "test-id";

		const { Services } = require(servicesPath);
		Services.db.entry.findUnique.mockResolvedValue(null);

		await expect(getById(id)).rejects.toThrow("Entry not found");
	});

	test("should retrieve all entries for a feed without filters", async () => {
		const feedId = "test-feed-id";
		const mockEntries = [
			{ id: "1", title: "Test Entry 1" },
			{ id: "2", title: "Test Entry 2" },
		];

		const { Services } = require(servicesPath);
		Services.db.entry.findMany.mockResolvedValue(mockEntries);

		const entries = await getByFeed(feedId);

		expect(entries).toEqual(mockEntries);
		expect(Services.db.entry.findMany).toHaveBeenCalledWith({ where: { feedId } });
	});

	test("should retrieve favorite entries for a feed", async () => {
		const feedId = "test-feed-id";
		const mockEntries = [{ id: "1", title: "Test Entry 1", favorite: true }];

		const { Services } = require(servicesPath);
		Services.db.entry.findMany.mockResolvedValue(mockEntries);

		const entries = await getByFeed(feedId, "favorite");

		expect(entries).toEqual(mockEntries);
		expect(Services.db.entry.findMany).toHaveBeenCalledWith({
			where: { feedId, favorite: true },
		});
	});
	// ... Add other filter scenarios similarly
});

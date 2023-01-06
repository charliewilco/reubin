// @ts-ignore
import {
	objectType,
	stringArg,
	nonNull,
	idArg,
	booleanArg,
	arg,
	inputObjectType,
	enumType,
	scalarType,
	asNexusMethod,
	makeSchema,
} from "nexus";
import { GraphQLDate } from "@reubin/graphql-date-ts";

export const GQLDate = asNexusMethod(GraphQLDate, "date");

export const DateScalar = scalarType({
	name: "Date",
	serialize: (value) => (value as Date).toISOString(),
	parseValue: (value) => new Date(value as string | number),
	parseLiteral: (ast) => {
		if (ast.kind === "IntValue" || ast.kind === "StringValue") {
			const d = new Date(ast.value);
			if (!isNaN(d.valueOf())) {
				return d;
			}
		}
		throw new Error("Invalid date");
	},
	asNexusMethod: "date",
	sourceType: "Date",
});

// @ts-ignore
const Activity = objectType({
	name: "Activity",
	definition(t) {
		t.nonNull.list.int("unread");
		t.nonNull.list.int("starred");
	},
});

const Entry = objectType({
	name: "Entry",
	definition(t) {
		t.nonNull.id("id");
		t.nonNull.id("feed_id");
		t.nonNull.string("title");
		t.string("url");
		t.string("content", { description: "HTML String" });
		t.string("author");
// @ts-ignore
		t.date("published");
// @ts-ignore
		t.date("created_at");
		t.nonNull.boolean("unread");
		t.nonNull.boolean("favorite");
	},
});

const Feed = objectType({
	name: "Feed",
	definition(t) {
		t.nonNull.id("id");
		t.nonNull.string("title");
		t.nonNull.string("link");
// @ts-ignore
		t.nonNull.date("lastFetched");
		t.id("tag");
		t.nonNull.string("feedURL");
	},
});

const Mutation = objectType({
	name: "Mutation",
	definition(t) {
		t.nonNull.field("createUser", {
			type: ReturnedUser,
			args: {
				email: nonNull(stringArg()),
				password: nonNull(stringArg()),
			},
		});
		t.nonNull.field("login", {
			type: ReturnedUser,
			args: {
				email: nonNull(stringArg()),
				password: nonNull(stringArg()),
			},
		});
		t.nonNull.field("addFeed", {
			type: Feed,
			args: {
				url: nonNull(stringArg()),
			},
		});
		t.nonNull.field("addTag", {
			type: Tag,
			args: {
				name: nonNull(stringArg()),
			},
		});
		t.nonNull.field("removeFeed", {
			type: Feed,
			args: {
				id: nonNull(idArg()),
			},
		});
		t.nonNull.field("removeTag", {
			type: Tag,
			args: {
				id: nonNull(idArg()),
			},
		});
		t.nonNull.list.nonNull.field("refreshFeed", {
			type: Entry,
			args: {
				id: nonNull(idArg()),
			},
		});
		t.nonNull.field("markAsFavorite", {
			type: Entry,
			args: {
				id: nonNull(idArg()),
				favorite: nonNull(booleanArg()),
			},
		});
		t.nonNull.field("markAsRead", {
			type: Entry,
			args: {
				id: nonNull(idArg()),
			},
		});
		t.nonNull.field("updateFeed", {
			type: Feed,
			args: {
				id: nonNull(idArg()),
				fields: arg({ type: UpdateFeedInput }),
			},
		});
	},
});
const Query = objectType({
	name: "Query",
	definition(t) {
		t.nonNull.list.field("tags", { type: Tag });
		t.nonNull.list.field("feeds", {
			type: Feed,
			args: {
				tag_id: idArg(),
			},
		});
		t.nonNull.field("entry", {
			type: Entry,
			args: {
				id: nonNull(idArg()),
			},
		});
		t.nonNull.field("feed", {
			type: Feed,
			args: {
				id: nonNull(idArg()),
			},
		});
		t.nonNull.list.nonNull.field("entries", {
			type: Entry,
			args: {
				feed_id: nonNull(idArg()),
				filter: arg({ type: EntryFilter }),
			},
		});
		t.nonNull.field("me", { type: User });
	},
});
const ReturnedUser = objectType({
	name: "ReturnedUser",
	definition(t) {
		t.nonNull.field("user", { type: User });
		t.nonNull.string("token");
	},
});
const Tag = objectType({
	name: "Tag",
	definition(t) {
		t.nonNull.id("id");
		t.nonNull.string("title");
	},
});
const User = objectType({
	name: "User",
	definition(t) {
		t.nonNull.string("email");
		t.string("displayName");
		t.int("avatarColor");
		t.nonNull.int("refreshInterval");
		t.nonNull.id("id");
	},
});

const UpdateFeedInput = inputObjectType({
	name: "UpdateFeedInput",
	definition(t) {
		t.string("title");
		t.id("tagID");
	},
});
export const UpdateUserInput = inputObjectType({
	name: "UpdateUserInput",
	definition(t) {
		t.string("displayName");
		t.int("refreshInterval");
	},
});

const EntryFilter = enumType({
	name: "EntryFilter",
	members: ["UNREAD", "ALL", "FAVORITED"],
});

export const schema = makeSchema({
	types: [DateScalar, Query, Mutation, Entry, Feed],
});

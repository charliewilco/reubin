import gql from "graphql-tag";

export const typeDefs = gql`
	scalar Date

	enum EntryFilter {
		UNREAD
		ALL
		FAVORITED
	}

	type Feed {
		id: ID!
		title: String!
		link: String!
		lastFetched: Date!
	}

	type Activity {
		unread: [Int]!
		starred: [Int]!
	}

	type Entry {
		id: ID!
		feed_id: ID!
		title: String!
		url: String
		"""
		HTML String
		"""
		content: String
		author: String
		published: Date
		created_at: Date
		unread: Boolean!
		favorite: Boolean!
	}

	type Query {
		feeds: [Feed]!
		entry(id: ID!): Entry!
		feed(id: ID!): Feed!
		entries(feed_id: ID!, filter: EntryFilter): [Entry!]!
	}

	type Mutation {
		addFeed(url: String!): Feed!
		removeFeed(id: ID!): Feed!
		refreshFeed(id: ID!): [Entry!]!
		markAsFavorite(id: ID!): Entry!
		markAsRead(id: ID!): Entry!
	}

	schema {
		query: Query
		mutation: Mutation
	}
`;
import type { RSSItem } from '@xmlxyz/rsskit'
import type { QueryResultRow } from '@neondatabase/serverless'
import type { EntryFilter } from '$/lib/filters'
import { prisma } from '$/lib/orm'
import { sql } from '$/lib/db'

export type Entry = {
	id: string
	link: string
	title: string
	content: string
	pubDate: Date
	favorite: boolean
	unread: boolean
	feedId: string | null
	readAt: Date | null
	summary: string | null
}

type LeanEntry = Pick<Entry, 'content' | 'title' | 'feedId' | 'pubDate' | 'link'>

export function coerceRow(row: QueryResultRow): Entry {
	return {
		id: row.id,
		link: row.link,
		title: row.title,
		content: row.content,
		pubDate: row.pub_date,
		favorite: row.favorite,
		unread: row.unread,
		feedId: row.feed_id,
		readAt: row.read_at,
		summary: row.summary,
	}
}

export function fromRSS(rssItem: RSSItem, feedId: string): LeanEntry {
	return {
		title: rssItem.title ?? 'Untitled Entry',
		content: rssItem.content ?? '',
		link: rssItem.link!,
		feedId,
		pubDate: new Date(rssItem.pubDate ?? Date.now()),
	}
}

export async function favorite(id: string): Promise<Entry> {
	const result = await sql`UPDATE entry SET favorite = TRUE WHERE id = ${id}`

	const entry = coerceRow(result.rows[0])
	if (entry === null) {
		throw new Error('Entry not updated')
	}

	return entry
}

export async function feedBelongsToUser(feedId: string, userId: string): Promise<boolean> {
	const result = await sql`
	SELECT COUNT(*) FROM entry
	JOIN feed ON entry.feedId = feed.id
	WHERE entry.id = ${feedId} AND feed.userId = ${userId};`
	return result.rows[0].count > 0
}

export async function markAsRead(id: string): Promise<Entry> {
	const result = await sql`UPDATE entry SET unread = FALSE WHERE id = ${id}`

	const entry = coerceRow(result.rows[0])
	if (entry === null) {
		throw new Error('Entry not updated')
	}

	return entry
}

export async function markAsUnread(id: string): Promise<Entry> {
	const result = await sql`UPDATE entry SET unread = TRUE WHERE id = ${id}`

	const entry = coerceRow(result.rows[0])
	if (entry === null) {
		throw new Error('Entry not updated')
	}

	return entry
}

export async function getById(id: string): Promise<Entry> {
	const result = await sql`SELECT * FROM entry WHERE id = ${id}`

	if (!result) {
		throw new Error('Entry not found')
	}

	const row: QueryResultRow = result.rows[0]

	return coerceRow(row)
}

export async function getByFeed(feedId: string, filter?: EntryFilter): Promise<Entry[]> {
	let args: any = { feedId: feedId }

	if (filter === 'favorite') {
		args.favorite = true
	}

	if (filter === 'unread') {
		args.unread = true
	}

	const entries =
		(await prisma.entry.findMany({
			where: args,
		})) ?? []

	return entries
}

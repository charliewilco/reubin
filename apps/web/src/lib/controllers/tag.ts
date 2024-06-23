import { prisma } from "$/lib/db";
import type { Tag } from "@prisma/client";

export function fromORM(tag: Tag) {
	return {
		id: tag.id,
		title: tag.title,
	};
}

export async function getById(id: string, userId?: string) {
	if (!userId) throw new Error("No user id");
	return prisma.tag.findUnique({
		where: {
			tagUserId: {
				id,
				userId: userId,
			},
		},
	});
}

export async function getAll(userId?: string) {
	return prisma.tag.findMany({
		where: {
			userId,
		},
	});
}

export async function updateById(title: string, id: string, userId?: string) {
	if (!userId) throw new Error("No user id");

	return prisma.tag.update({
		where: {
			tagUserId: {
				id,
				userId: userId,
			},
		},
		data: {
			title: title,
		},
	});
}

export async function add(name: string, userId?: string) {
	try {
		if (!userId) throw new Error("No user id");

		const tag = await prisma.tag.create({
			data: {
				title: name,
				userId,
			},
		});

		return {
			id: tag.id,
			title: tag.title,
		};
		// biome-ignore lint/suspicious/noExplicitAny: Error is thrown by Prisma
	} catch (error: any) {
		throw new Error(error);
	}
}

export async function remove(id: string, userId: string) {
	const tag = await prisma.tag.findUnique({
		where: {
			id,
		},
	});

	if (tag?.userId === userId) {
		const tag = await prisma.tag.delete({
			where: {
				id,
			},
		});
		return {
			id: tag.id,
			title: tag.title,
		};
	}
	throw new Error("Could not find tag");
}

import type { Tag } from "@prisma/client";
import { ORM } from "$/lib/orm";

export class TagController {
	static fromORM(tag: Tag) {
		return {
			id: tag.id,
			title: tag.title,
		};
	}

	async getById(id: string, userId: string) {
		return ORM.tag.findUnique({
			where: {
				tagUserId: {
					id,
					userId: userId,
				},
			},
		});
	}

	async getAll(userId: string) {
		return ORM.tag.findMany({
			where: {
				userId,
			},
		});
	}

	async updateById(title: string, id: string, userId: string) {
		return ORM.tag.update({
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

	async add(name: string, userId: string) {
		try {
			const tag = await ORM.tag.create({
				data: {
					title: name,
					userId,
				},
			});

			return {
				id: tag.id,
				title: tag.title,
			};
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async remove(id: string, userId: string) {
		const tag = await ORM.tag.findUnique({
			where: {
				id,
			},
		});

		if (tag?.userId === userId) {
			const tag = await ORM.tag.delete({
				where: {
					id,
				},
			});
			return {
				id: tag.id,
				title: tag.title,
			};
		} else {
			throw new Error("Could not find tag");
		}
	}
}

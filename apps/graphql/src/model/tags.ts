import { Tag } from "@prisma/client";
import type { Tag as TagType } from "../__generated__";
import type { Services } from "../services";

export class TagController {
  static fromORM(tag: Tag): TagType {
    return {
      id: tag.id,
      title: tag.title,
    };
  }

  constructor(public services: Services) {}

  async getAll(token: string) {
    const userId = this.services.token.getUserId(token);
    const tags = await this.services.orm.tag.findMany({
      where: {
        userId,
      },
    });
    const converted = [];
    for (let index = 0; index < tags.length; index++) {
      converted.push(TagController.fromORM(tags[index]));
    }

    return converted;
  }

  async add(name: string, token: string) {
    const userId = this.services.token.getUserId(token);
    try {
      const tag = await this.services.orm.tag.create({
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

  async remove(id: string, _token: string) {
    // const userId = this.services.token.getUserId(token);

    const tag = await this.services.orm.tag.delete({
      where: {
        id,
      },
    });

    return {
      id: tag.id,
      title: tag.title,
    };
  }
}

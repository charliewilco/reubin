import * as base64 from "base-64";
import { User } from "@prisma/client";

import { ReturnedUser, User as UserType } from "../__generated__";
import type { Context } from "../context";
import type { Services } from "../services";

export class UserManager {
  static fromORM(user: User): UserType {
    return {
      id: user.id,
      email: user.email,
      refreshInterval: 60,
      avatarColor: 250,
    };
  }
  constructor(public context: Context, public services: Services) {}
  async create(email: string, password: string): Promise<ReturnedUser> {
    const decoded = base64.decode(password);

    await this.services.validations.createUserValidation.parseAsync({
      email: email,
      password: decoded,
    });

    const user = await this.context.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user === null) {
      const hash = await this.services.password.getHash(decoded);
      const user = await this.context.prisma.user.create({
        data: {
          email: email,
          password: hash,
          name: email,
        },
      });

      const token = this.services.token.create(user);

      return {
        user: UserManager.fromORM(user),
        token,
      };
    } else {
      throw new Error("Hey ummmm, that email is already taken. This is awkward.");
    }
  }

  async verify(email: string, password: string): Promise<ReturnedUser> {
    const decoded = base64.decode(password);
    await this.services.validations.createUserValidation.parseAsync({
      email: email,
      password: decoded,
    });

    const user = await this.context.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user !== null) {
      const token = this.services.token.create(user);

      return {
        user: UserManager.fromORM(user),
        token,
      };
    } else {
      throw new Error("No dice, slim");
    }
  }
}

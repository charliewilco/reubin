import * as jwt from "jsonwebtoken";
import type { User } from "@prisma/client";

interface TokenContents {
  user: string;
  name: string;
}

export class TokenManager {
  static isTokenContents(value: unknown): value is TokenContents {
    return value !== null && (typeof value === "object" || typeof value === "function");
  }

  constructor(private secret: string = "1a9876c4-6642-4b83-838a-9e84ee00646a") {}

  create(user: User): string {
    const jwtConfig: jwt.SignOptions = {
      algorithm: "HS256",
      expiresIn: "180 days",
    };

    const data: TokenContents = {
      user: user.id,
      name: user.name,
    };

    return jwt.sign(data, this.secret, jwtConfig);
  }

  read(token: string):
    | (TokenContents & {
        token: string;
      })
    | null {
    const contents = jwt.verify(token, this.secret, {
      complete: false,
    });
    return TokenManager.isTokenContents(contents) ? { ...contents, token } : null;
  }
}

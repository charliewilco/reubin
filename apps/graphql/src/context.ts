import type { FastifyRequest } from "fastify";
import Cookies from "universal-cookie";
export interface Context {
  token: string | null;
}

export function getContext(request: FastifyRequest): Context {
  const cookies = new Cookies(request.headers.cookie ?? "");
  const parsed = cookies.getAll();
  request.headers.authorization;
  let token: string | null = null;

  if (parsed["REUBIN_TOKEN"]) {
    token = parsed["REUBIN_TOKEN"] ?? request.headers.authorization;
  }

  return { token };
}

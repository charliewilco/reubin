import { GetServerSidePropsContext } from "next";

export type ResolverContext = Pick<GetServerSidePropsContext, "req" | "res">;

export const deriveHeader = (
  context: ResolverContext,
  method: string = "GET",
  body?: string,
  additionalHeaders?: Omit<Headers, "Authorization">
): RequestInit => {
  const Authorization = context.req.headers["authorization"]!;

  const init: RequestInit = {
    method,
    headers: {
      Authorization,
      "Content-Type": "application/json",
      ...additionalHeaders,
    },
    body,
  };

  return init;
};

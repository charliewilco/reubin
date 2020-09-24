import { GetServerSidePropsContext } from "next";

export type ResolverContext = Pick<GetServerSidePropsContext, "req" | "res">;

export const deriveHeader = (
  context: ResolverContext,
  additionalHeaders?: Omit<Headers, "Authorization">
) => {
  const Authorization = context.req.headers["authorization"]!;

  const init = {
    headers: {
      Authorization,
      ...additionalHeaders,
    },
  };

  return init;
};

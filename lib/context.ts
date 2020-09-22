import { GetServerSidePropsContext } from "next";

export type ResolverContext = Pick<GetServerSidePropsContext, "req" | "res">;

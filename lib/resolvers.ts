import { Query } from "./queries";
import { Mutation } from "./mutations";
import { ResolverContext } from "./context";
import { IItemIdResolvers, IResolvers } from "./types";

export const resolvers: IResolvers<ResolverContext> = {
  Query,
  Mutation,
};

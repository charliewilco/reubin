import type { IGraphQLProject } from "graphql-config";
import path from "node:path";

const config: IGraphQLProject = {
  schema: path.join(process.cwd(), "apps/graphql/src/schema.graphql"),
  extensions: {
    codegen: {
      generates: {
        [path.join(process.cwd(), "apps/graphql/src/__generated__.ts")]: {
          plugins: ["typescript", "typescript-resolvers"],
        },
        [path.join(process.cwd(), "apps/ui/src/lib/__generated__.ts")]: {
          documents: path.join(process.cwd(), "apps/ui/src/lib/*.graphql"),
          plugins: ["typescript", "typescript-operations", "typescript-graphql-request"],
        },
      },
      hooks: {
        afterAllFileWrite: ["prettier --write"],
      },
    },
  },
};

export default config;

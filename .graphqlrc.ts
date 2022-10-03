import type { IGraphQLProject } from "graphql-config";

const config: IGraphQLProject = {
  schema: "apps/graphql/src/schema.graphql",
  extensions: {
    codegen: {
      generates: {
        "./apps/graphql/src/__generated__.ts": {
          plugins: ["typescript", "typescript-resolvers"],
        },
        "./apps/ui/src/lib/__generated__.ts": {
          documents: "apps/ui/src/lib/*.graphql",
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

import type { IGraphQLProject } from "graphql-config";

const config: IGraphQLProject = {
  schema: "graphql/src/schema.graphql",
  extensions: {
    codegen: {
      generates: {
        "./graphql/src/__generated__.ts": {
          plugins: ["typescript", "typescript-resolvers"],
        },
        "./ui/src/lib/__generated__.ts": {
          documents: "ui/src/lib/*.graphql",
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

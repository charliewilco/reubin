// @ts-check

import { executeCodegen } from "@graphql-codegen/cli";

/** @type {import('graphql-config').IGraphQLConfig} */
const config = {
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

if (config.extensions) {
  try {
    await executeCodegen({
      schema: config.schema,
      ...config.extensions.codegen,
    });
  } catch (error) {
    console.error(error);
  }
}

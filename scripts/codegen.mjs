// @ts-check

import { executeCodegen } from "@graphql-codegen/cli";

/** @type {import('graphql-config').IGraphQLConfig} */
const config = {
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

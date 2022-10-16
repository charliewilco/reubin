import arg from "arg";

import { DbPush, DbPull } from "@prisma/migrate";

const argsToParse = ["--schema", "apps/graphql/prisma/schema.prisma"];

const args = arg({ "--push": Boolean });

if (args["--push"]) {
  await DbPush.new().parse(argsToParse);
} else if (args["--push"]) {
  await DbPull.new().parse(argsToParse);
}

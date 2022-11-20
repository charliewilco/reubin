import arg from "arg";

import { DbPush, DbPull, DbDrop } from "@prisma/migrate";

const argsToParse = ["--schema", "apps/graphql/prisma/schema.prisma"];

const args = arg({ "--push": Boolean, "--pull": Boolean, "--drop": Boolean });

if (args["--push"]) {
	await DbPush.new().parse(argsToParse);
} else if (args["--pull"]) {
	await DbPull.new().parse(argsToParse);
} else if (args["--drop"]) {
	await DbDrop.new().parse(argsToParse);
}

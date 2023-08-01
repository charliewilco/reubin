// @ts-check

import { deleteAsync } from "del";
import arg from "arg";
import path from "node:path";

const turboCachePaths = [];
const buildOuputPaths = [
	".husky",
	".next",
	"coverage",
	"tsconfig.tsbuildinfo",
	"e2e/playwright-report",
	"*/**/.DS_Store",
	".DS_Store",
];

const args = arg({
	"--all": Boolean,
	"--dryrun": Boolean,
	"-a": "--all",
	"-d": "--dryrun",
});

if (!process.env.CI) {
	const removedPaths = await deleteAsync(
		args["--all"] ? [...turboCachePaths, ...buildOuputPaths] : buildOuputPaths,
		{
			dryRun: args["--dryrun"],
		}
	);

	if (args["--dryrun"]) {
		console.log("Would-be deleted directories:\n");
	} else {
		console.log("Deleted directories:\n");
	}

	for (const removed of removedPaths) {
		console.log("♻️ ", path.relative(process.cwd(), removed));
	}
}

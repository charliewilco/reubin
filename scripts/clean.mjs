// @ts-check

import { deleteAsync } from "del";
import arg from "arg";
import path from "node:path";

const turboCachePaths = ["./apps/**/.turbo", "./packages/**/.turbo"];
const buildOuputPaths = [
	".husky",
	".parcel-cache",
	"apps/browser-extension/dist",
	"apps/ui/.next",
	"apps/ui/coverage",
	"apps/ui/tsconfig.tsbuildinfo",
	"e2e/playwright-report",
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

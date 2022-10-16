// @ts-check

import { deleteAsync } from "del";
import arg from "arg";
import path from "path";

const turboCachePaths = ["./**/.turbo"];
const buildOuputPaths = [
  ".parcel-cache",
  "browser-extension/dist",
  "graphql/dist",
  "ui/.next",
];

const args = arg({
  "--all": Boolean,
  "--dryrun": Boolean,
  "-a": "--all",
  "-d": "--dryrun",
});

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

// @ts-check

import { deleteAsync } from "del";
import arg from "arg";

const turboCachePaths = ["./**/.turbo"];
const buildOuputPaths = [
  "browser-extension/dist",
  ".parcel-cache",
  "graphql/dist",
  "ui/.next",
];

const args = arg({
  "--all": Boolean,
});

const paths = args["--all"] ? [...turboCachePaths, ...buildOuputPaths] : buildOuputPaths;

const removedPaths = await deleteAsync(paths);

console.log("Deleted directories:\n", removedPaths.join("\n"));

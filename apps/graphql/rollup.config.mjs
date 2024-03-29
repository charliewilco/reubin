// @ts-check
import run from "@rollup/plugin-run";
import ts from "@rollup/plugin-typescript";
import graphql from "@rollup/plugin-graphql";
import { defineConfig } from "rollup";

const isDev = process.env.ROLLUP_WATCH === "true";

/** @type {any[]} */
const plugins = [graphql(), ts()];

if (isDev) {
	plugins.push(run());
}

export default defineConfig({
	input: "./src/server.ts",
	external: (id) => !/^[./]/.test(id),
	shimMissingExports: true,
	output: [
		{
			file: "./dist/server.js",
			format: "esm",
			sourcemap: true,
		},
	],
	// @ts-ignore
	plugins,
});

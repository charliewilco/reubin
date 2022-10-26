// @ts-check
import run from "@rollup/plugin-run";
import ts from "@rollup/plugin-typescript";
import graphql from "@rollup/plugin-graphql";
import { defineConfig } from "rollup";

const isDev = process.env.ROLLUP_WATCH === "true";

/** @type {import('rollup').Plugin[]} */
const plugins = [graphql(), ts()];

if (isDev) {
  plugins.push(run());
}

export default defineConfig({
  input: "./src/server.ts",
  external: (id) => !/^[./]/.test(id),
  output: [
    {
      file: "./dist/server.js",
      format: "cjs",
      sourcemap: true,
    },
  ],
  // @ts-ignore
  plugins,
});

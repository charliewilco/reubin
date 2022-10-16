// @ts-check
import run from "@rollup/plugin-run";
import ts from "@rollup/plugin-typescript";
import graphql from "@rollup/plugin-graphql";
import { defineConfig } from "rollup";

const isDev = process.env.ROLLUP_WATCH === "true";

export default defineConfig([
  {
    input: "./src/server.ts",
    external: (id) => !/^[./]/.test(id),
    output: [
      {
        file: "./dist/server.js",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [graphql(), ts(), isDev && run()],
  },
]);

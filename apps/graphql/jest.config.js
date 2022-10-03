// @ts-check

/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  transform: {
    "\\.(gql|graphql)$": "<rootDir>/graphql-transformer.js",
  },
};

module.exports = config;

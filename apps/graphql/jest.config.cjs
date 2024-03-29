// @ts-check

/** @type {import('jest').Config} */
module.exports = {
	preset: "ts-jest/presets/default-esm",
	testEnvironment: "node",
	verbose: true,
	transform: {
		"\\.(gql|graphql)$": "<rootDir>/graphql-transformer.cjs",
	},
};

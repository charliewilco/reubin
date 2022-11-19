// @ts-check

/** @type {import('jest').Config} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	verbose: true,
	transform: {
		"\\.(gql|graphql)$": "<rootDir>/graphql-transformer.cjs",
	},
};

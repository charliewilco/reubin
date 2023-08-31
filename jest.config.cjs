// @ts-check
const nextJest = require("next/jest");

const createJestConfig = nextJest.default({
	dir: "./",
});

/** @type {import('jest').Config} */
const config = {
	testPathIgnorePatterns: ["<rootDir>/e2e"],

	// Add more setup options before each test is run
	// setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	// if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
	moduleDirectories: ["node_modules", "<rootDir>/"],
	testEnvironment: "jest-environment-jsdom",
	coveragePathIgnorePatterns: ["/node_modules/"],
	collectCoverageFrom: [
		"<rootDir>/src/lib/**/*.{ts,tsx}",
		"<rootDir>/src/utils/**/*.{ts,tsx}",
	],
};

module.exports = createJestConfig(config);

// @ts-check

/** @type {import('jest').Config} */
module.exports = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	preset: "ts-jest",
	// Add more setup options before each test is run
	// setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	// if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
	moduleDirectories: ["node_modules", "<rootDir>/"],
	testEnvironment: "jest-environment-jsdom",
	coveragePathIgnorePatterns: ["/node_modules/"],
};

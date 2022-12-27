import { TestingMocks } from "./fixtures/mocks";

describe("Mock user", () => {
	test("initializes to null", () => {
		const mocks = new TestingMocks();
		expect(mocks.authToken).toBeNull();
		expect(mocks.currentEntry).toBeNull();
		expect(mocks.currentFeed).toBeNull();
		expect(mocks.currentTag).toBeNull();
		expect(mocks.entryCount).toEqual(0);
	});

	test("can set and get authToken", () => {
		const mocks = new TestingMocks();
		expect(mocks.authToken).toBeNull();
		mocks.authToken = "test";
		expect(mocks.authToken).toEqual("test");
	});

	test("can clear", () => {
		const mocks = new TestingMocks();

		mocks.authToken = "test";
		mocks.currentEntry = "test";
		mocks.currentFeed = "test";
		mocks.currentTag = "test";

		mocks.clearAll();

		expect(mocks.authToken).toBeNull();
		expect(mocks.currentEntry).toBeNull();
		expect(mocks.currentFeed).toBeNull();
		expect(mocks.currentTag).toBeNull();
	});
});

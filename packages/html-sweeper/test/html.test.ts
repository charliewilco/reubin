import { createSanitizer } from "../src";

const sanitizer = createSanitizer();

describe("HTML", () => {
	test.todo("can parse a string");
	test.todo("removes script tags");
	test.todo("removes script tags with attributes");
	test.todo("removes script tags with attributes and content");
	test.todo("removes style tags");
	test.todo("removes unsafe attributes");
	test.todo("removes unsafe attributes with values");
	test.todo("resolves relative URLs on image tags and media tags");

	test("handles normally", () => {
		const html = "<p>hello world</p>";
		const result = sanitizer.cleanSync(html);
		expect(result).toEqual("<p>hello world</p>");
	});
});

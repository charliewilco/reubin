import { classNames } from "../components/ui/class-names";

describe("Classnames", () => {
	test("can concat class names", () => {
		expect(classNames("hello", "ui-input")).toEqual("hello ui-input");
		expect(classNames("hello", "world")).toEqual("hello world");
	});

	test("can only return valid strings", () => {
		expect(classNames("hello", false && "world")).toEqual("hello");
		expect(
			classNames("x", {
				y: true,
				nope: false,
				z: "foo",
			})
		).toEqual("x y z");
	});
});

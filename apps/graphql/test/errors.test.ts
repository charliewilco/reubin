import { SDKError } from "../src/errors";

describe("Errors", () => {
  test("error contains message", () => {
    const error = new SDKError("Service unavailable", 503);
    expect(error).toBeInstanceOf(SDKError);
    expect(error.name).toBe("SDKError");
  });
});

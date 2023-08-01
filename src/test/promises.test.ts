import { delay } from "$/utils/promises";

describe("Promises", () => {
	test("delay pauses execution for specified time", async () => {
		const delayTime = 1000; // Delay for 1 second
		const startTime = Date.now();

		await delay(delayTime);

		const endTime = Date.now();
		const actualDelay = endTime - startTime;

		// Jest's timers are not exact, so we should check that the delay is at least the expected delay.
		// We can't assume it will be exactly the delay, especially in a real-world scenario with other
		// operations happening on the machine.
		expect(actualDelay).toBeGreaterThanOrEqual(delayTime);
	});
});

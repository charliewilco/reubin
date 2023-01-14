import { test, expect } from "@playwright/test";
import cuid from "cuid";

const mockUser = {
	email: `charliewilco-${cuid()}@gmail.com`,
	password: "P@ssw0rd",
};

test.beforeAll(() => {
	console.log("Using the following credentials:\n", JSON.stringify(mockUser, null, 2));
});

test("Register for an account", async ({ page }) => {
	await page.goto("http://localhost:3000/");
	await page.getByRole("link", { name: "Register" }).click();
	await expect(page.getByTestId("register-email-input")).not.toBeHidden();
	await page.getByTestId("register-email-input").click();
	await page.getByTestId("register-email-input").fill(mockUser.email);
	await page.getByTestId("register-email-input").press("Tab");
	await page.getByTestId("register-password-input").fill(mockUser.password);
	await page.getByRole("button", { name: "Register" }).click();
	await page.waitForLoadState("networkidle");
	await expect(page).toHaveURL("http://localhost:3000/feeds");
	await page.getByRole("button", { name: "Add Feed" }).click();
	await expect(page.getByTestId("add-feed-modal")).toHaveText(
		"Add a website URL to see if it has an RSS feed."
	);
	await page.getByTestId("add-feed-url").fill("https://charliewil.co/rss");
});

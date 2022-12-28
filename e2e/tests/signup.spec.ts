import { test, expect } from "@playwright/test";

test("Register for an account", async ({ page }) => {
	await page.goto("http://localhost:3000/");
	await page.getByRole("link", { name: "Register" }).click();
	await page.getByTestId("register-email-input").click();
	await page.getByTestId("register-email-input").fill("charliewilco@gmail.com");
	await page.getByTestId("register-email-input").press("Tab");
	await page.getByTestId("register-password-input").fill("P@ssw0rd");
	await page.getByRole("button", { name: "Register" }).click();
	await page.getByRole("button", { name: "Add Feed" }).click();
	await expect(page).toHaveURL("http://localhost:3000/feeds");
	await expect(page.getByTestId("add-feed-modal")).toHaveText("Add Feed");
	await page.getByTestId("add-feed-url").fill("https://charliewil.co/rss");
});

import { test, expect } from "@playwright/test";

test.describe("Todo Application", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should create a new todo with tags", async ({ page }) => {
    // Open add todo dialog
    await page.getByRole("button", { name: "Add Todo" }).click();

    // Fill todo title
    await page.getByRole("textbox", { name: "Task" }).click();
    await page.getByRole("textbox", { name: "Task" }).fill("Test Todo with Tags");

    // Add tags
    await page.getByRole("combobox").click();
    await page.getByLabel("Suggestions").getByText("work").click();
    await page.getByLabel("Suggestions").getByText("home").click();

    // Submit form
    await page.getByRole("button", { name: "Add Todo" }).click();

    // Verify todo and tags are visible
    await expect(page.getByText("Test Todo with Tags")).toBeVisible();
    const todoTags = page.getByTestId("todo-tags-Test Todo with Tags");
    await expect(todoTags).toBeVisible();
    await expect(todoTags.getByText("work")).toBeVisible();
    await expect(todoTags.getByText("home")).toBeVisible();
  });

  test("should toggle todo completion", async ({ page }) => {
    // Create a todo first
    await page.getByRole("button", { name: "Add Todo" }).click();
    await page.getByRole("textbox", { name: "Task" }).fill("Toggle Test Todo");
    await page.getByRole("button", { name: "Add Todo" }).click();

    // Find and click the checkbox
    await page.getByRole("checkbox", { name: "Toggle Test Todo" }).click();

    // Verify todo is marked as completed
    const todoItem = page.getByText("Toggle Test Todo").locator("..");
    await expect(todoItem).toHaveClass(/line-through/);
  });

  test("should delete a todo", async ({ page }) => {
    // Create a todo
    await page.getByRole("button", { name: "Add Todo" }).click();
    await page.getByRole("textbox", { name: "Task" }).fill("Todo to Delete");
    await page.getByRole("button", { name: "Add Todo" }).click();

    // Mark it as completed
    await page.getByRole("checkbox", { name: "Todo to Delete" }).click();

    // Click delete button
    await page.getByRole("button", { name: "Delete" }).click();

    // Verify todo is removed
    await expect(page.getByText("Todo to Delete")).not.toBeVisible();
  });
});

import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("prompt validation, cancellable rendering, and result creation", async ({
  page,
}) => {
  await page.goto("/");
  const prompt = page.getByRole("textbox", { name: "Describe your scene" });
  await prompt.fill(" ");
  await page.getByRole("button", { name: "Generate film" }).click();
  await expect(
    page.getByText("Give your imagination a starting point."),
  ).toBeVisible();
  await prompt.fill("An orange silk world unfolding over a volcanic desert.");
  await page.getByRole("button", { name: "Generate film" }).click();
  await expect(page.getByRole("progressbar")).toBeVisible();
  await page.getByRole("button", { name: "Cancel render" }).click();
  await expect(prompt).toHaveValue(
    "An orange silk world unfolding over a volcanic desert.",
  );
  await expect(page.getByRole("progressbar")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Generate film" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Preview Untitled experiment" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Generate film" }).click();
  await expect(page.getByText("Your imagination, rendered.")).toBeVisible({
    timeout: 15000,
  });
  await expect(
    page.getByRole("button", { name: "Preview Untitled experiment" }),
  ).toBeVisible();
});

test("archive filters and modal focus, timeline controls", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Abstract", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Preview Soft matter" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Preview The other side" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Preview Soft matter" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Preview Soft matter" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Play timeline" }).click();
  await expect(
    page.getByRole("button", { name: "Pause timeline" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Pause timeline" }).click();
  await page.getByRole("slider", { name: "Timeline position" }).fill("50");
  await expect(
    page.getByRole("slider", { name: "Timeline position" }),
  ).toHaveValue("50");
});

test("desktop and mobile are accessible and fit viewport", async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    await page.screenshot({
      path: `test-results/studio-${width}.png`,
      fullPage: true,
    });
    await page.screenshot({ path: `test-results/chamber-${width}.png` });
  }
});

test("responsive controls, local assets, and reduced motion", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    const heading = await page.locator("h1").boundingBox();
    expect(heading!.x + heading!.width).toBeLessThanOrEqual(width);
    await page
      .getByRole("combobox", { name: "RATIO", exact: true })
      .selectOption("9:16");
    await expect(
      page.getByRole("combobox", { name: "RATIO", exact: true }),
    ).toHaveValue("9:16");
    await page
      .getByRole("button", { name: "Advanced render settings" })
      .click();
    await page
      .getByRole("combobox", { name: "MOTION" })
      .selectOption("Dynamic");
    await page.getByRole("textbox", { name: "Seed" }).fill("123456");
    await expect(page.getByRole("textbox", { name: "Seed" })).toHaveValue(
      "123456",
    );
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page
      .locator(".plane-main")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  expect(
    await page
      .locator(".frame-sculpture")
      .evaluate((el) => getComputedStyle(el).transform),
  ).toBe("none");
  expect(errors).toEqual([]);
});

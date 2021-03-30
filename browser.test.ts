/// <reference types="jest-playwright-preset" />

beforeAll(async () => {
  await page.goto("https://whatismybrowser.com/")
})

test("should display correct browser", async () => {
  const browser = await page.$eval(".string-major", (el) => el.innerHTML)
  expect(browser).toContain("Safari")
})

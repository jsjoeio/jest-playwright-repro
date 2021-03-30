/// <reference types="jest-playwright-preset" />

describe("login page", () => {
  beforeEach(async () => {
    await jestPlaywright.resetContext()
    await page.goto("http://localhost:8080")
    // await page.goto("https://github1s.com/microsoft/playwright")
  })

  it("should see the login page", async () => {
    // It should send us to the login page
    expect(await page.title()).toBe("code-server login")
    // expect(await page.title()).toBe("GitHub1s")
  })
})

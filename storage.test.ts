/// <reference types="jest-playwright-preset" />

const STORAGE = process.env.STORAGE || ""

describe("storage", () => {
  beforeEach(async () => {
    const storageState = JSON.parse(STORAGE) || {}
    await jestPlaywright.resetContext({ storageState })
    await page.goto("http://localhost:8080", { waitUntil: "networkidle" })
  })

  it("should keep us logged in using storageState", async () => {
    // See the editor
    const codeServerEditor = await page.isVisible(".monaco-workbench")
    expect(codeServerEditor).toBeTruthy()
  })
})

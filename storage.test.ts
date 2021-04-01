/// <reference types="jest-playwright-preset" />

const STORAGE = process.env.STORAGE || ""

describe("storage", () => {
  beforeEach(async () => {
    const storageState = JSON.parse(STORAGE) || {}
    console.log("Storage ===>", storageState)
    await jestPlaywright.resetContext({ storageState })
    await page.goto("http://localhost:8080")
    // code-server takes a second to load
    await page.waitForTimeout(1000)
  })

  it("should keep us logged in using storageState", async () => {
    // See the editor
    const codeServerEditor = await page.isVisible(".monaco-workbench")
    expect(codeServerEditor).toBeTruthy()
  })
})

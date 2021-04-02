/// <reference types="jest-playwright-preset" />

const PASSWORD = "e45432jklfdsab"

describe("login", () => {
  beforeEach(async () => {
    await jestPlaywright.resetBrowser()
    await page.goto("http://localhost:8080", { waitUntil: "networkidle" })
  })

  it("should be able to login", async () => {
    // Type in password
    await page.fill(".password", PASSWORD)
    // Click the submit button and login
    await page.click(".submit")
    await page.waitForLoadState("networkidle")
    // See the editor
    const codeServerEditor = await page.isVisible(".monaco-workbench")
    expect(codeServerEditor).toBeTruthy()

    // Click the Application menu
    await page.click("[aria-label='Application Menu']")

    // See the Log out button
    const logoutButton = "a.action-menu-item span[aria-label='Log out']"
    expect(await page.isVisible(logoutButton))

    await page.hover(logoutButton)

    await page.click(logoutButton)
    // it takes a couple seconds for url to change
    await page.waitForNavigation({ url: "https://localhost:8080/login" })
    const currentUrl = page.url()
    expect(currentUrl).toBe(`https://localhost:8080/login`)
  })
})

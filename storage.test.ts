/// <reference types="jest-playwright-preset" />

const PASSWORD = "e45432jklfdsab"

describe("logout", () => {
  beforeEach(async () => {
    await jestPlaywright.resetBrowser({ recordVideo: { dir: "./videos" } })
    await page.goto("http://localhost:8080", { waitUntil: "networkidle" })
  })

  it("should be able login and logout", async () => {
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
    // TEST later maybe wait for this to appear?
    const logoutButton = "a.action-menu-item span[aria-label='Log out']"
    expect(await page.isVisible(logoutButton))

    await page.hover(logoutButton)
    // TEST try waiting after the hover
    await page.waitForTimeout(2000)

    // Recommended by Playwright for async navigation
    // https://github.com/microsoft/playwright/issues/1987#issuecomment-620182151
    await Promise.all([page.waitForNavigation(), page.click(logoutButton)])
    // TODO(@jsjoeio)
    // This test was originally flaky in that 50% of the time the redirect
    // after clicking the logout button would send them to the login page
    // Instead, we navigate to / and expect them to be logged out
    // still testing that they get logged out, but ideally we shouldn't have
    // to navigate back to the root. It should just happen as part of logging out.
    const currentUrl = page.url()
    expect(currentUrl).toBe(`http://localhost:8080/login`)
  })
})

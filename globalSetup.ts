// This setup runs before our e2e tests
// so that it authenticates us into code-server
// ensuring that we're logged in before we run any tests
import { chromium } from "playwright"

const PASSWORD = "123password"

module.exports = async () => {
  console.log("\n🚨 Running Global Setup for Jest End-to-End Tests")
  console.log("     Please hang tight...")
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto("http://localhost:8080", { waitUntil: "domcontentloaded" })
  // Type in password
  await page.fill(".password", PASSWORD)
  // Click the submit button and login
  await page.click(".submit")
  // After logging in, we store a cookie in localStorage
  // we need to wait a bit to make sure that happens
  // before we grab the storage and save it
  await page.waitForTimeout(1000)

  // Save storage state and store as an env variable
  // More info: https://playwright.dev/docs/auth?_highlight=authe#reuse-authentication-state
  const storage = await context.storageState()
  process.env.STORAGE = JSON.stringify(storage)

  await page.close()
  await browser.close()
  await context.close()
  console.log("✅ Global Setup for Jest End-to-End Tests is now complete.")
}

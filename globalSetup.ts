// This setup runs before our e2e tests
// so that it authenticates us into code-server
// ensuring that we're logged in before we run any tests
import { chromium } from "playwright"
import * as crypto from "crypto"

const PASSWORD = "123password"
const hash = (str: string): string => {
  return crypto.createHash("sha256").update(str).digest("hex")
}

module.exports = async () => {
  console.log("\n🚨 Running Global Setup for Jest End-to-End Tests")
  console.log("     Please hang tight...")
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  // Save storage state and store as an env variable
  // More info: https://playwright.dev/docs/auth?_highlight=authe#reuse-authentication-state
  const storage = await context.storageState()
  // todo fix error ts
  storage.cookies = [
    {
      sameSite: "Lax" as const,
      name: "key",
      value: hash(PASSWORD),
      domain: "localhost",
      path: "/",
      expires: -1,
      httpOnly: false,
      secure: false,
    },
  ]
  process.env.STORAGE = JSON.stringify(storage)

  await page.close()
  await browser.close()
  await context.close()
  console.log("✅ Global Setup for Jest End-to-End Tests is now complete.")
}

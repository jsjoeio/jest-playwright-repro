const { firefox } = require("playwright")

// 1. Install code-server `yarn global add code-server` and run locally: `code-server`
// 2. node index.js

;(async () => {
  const browser = await firefox.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto("http://localhost:8080")
  const title = await page.title()

  if (title === "code-server login") {
    console.log("It worked!")
  } else {
    console.log("It failed.")
  }
})()

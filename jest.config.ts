module.exports = {
  preset: "jest-playwright-preset",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testEnvironmentOptions: {
    "jest-playwright": {
      browsers: ["webkit"],
    },
  },
}

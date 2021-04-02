module.exports = {
  preset: "jest-playwright-preset",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  globalSetup: "<rootDir>/globalSetup.ts",
  testEnvironmentOptions: {
    "jest-playwright": {
      browsers: ["chromium"],
    },
    contextOptions: {
      recordVideo: {
        dir: "./videos",
      },
    },
  },
}

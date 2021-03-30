module.exports = {
  preset: "jest-playwright-preset",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testEnvironmentOptions: {
    "jest-playwright": {
      browsers: ["firefox"],
      contextOptions: {
        recordVideo: {
          dir: "./videos",
        },
      },
    },
  },
}

import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm",

  testEnvironment: "jsdom",

  extensionsToTreatAsEsm: [".ts", ".tsx"],

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "<rootDir>/tsconfig.jest.json",
      },
    ],
  },

  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],

  testMatch: ["<rootDir>/src/**/*.test.ts", "<rootDir>/src/**/*.test.tsx"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },

  clearMocks: true,

  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/main.tsx", "!src/test/**"],
};

export default config;

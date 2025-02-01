import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Use ts-jest for TypeScript
  testEnvironment: "node", // Use Node.js environment
  testMatch: ["**/?(*.)+(spec|test).ts?(x)"], // Look for TypeScript test files only
  moduleFileExtensions: ["ts", "js", "json", "node"], // File extensions to recognize
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json", // Path to your tsconfig file
    },
  },
  collectCoverage: true, // Enable coverage reporting
  coverageDirectory: "coverage", // Output directory for coverage reports
  coverageReporters: ["text", "lcov"], // Coverage report formats
  setupFilesAfterEnv: ['<rootDir>/test/mocks/prismaMock.ts']
};

export default config;

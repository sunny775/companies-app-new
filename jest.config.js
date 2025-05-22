import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.js"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/", "<rootDir>/out/"],
  collectCoverageFrom: [
    // Main source files
    "src/**/*.{js,jsx,ts,tsx}",
    // Exclude specific directories and files
    "!src/**/*.d.ts",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
    "!src/**/*.config.{js,ts}",
    "!src/**/index.{js,ts}", // barrel exports
    // Exclude test files
    "!src/**/*.test.{js,jsx,ts,tsx}",
    "!src/**/*.spec.{js,jsx,ts,tsx}",
    "!src/**/__tests__/**",
    "!src/**/__mocks__/**",
    // Exclude build outputs and configs
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/out/**",
    "!**/coverage/**",
    "!**/*.config.{js,ts}",
    // Exclude Next.js specific files that don't need testing
    "!src/app/layout.tsx", // often just wrapper
    "!src/app/loading.tsx",
    "!src/app/error.tsx",
    "!src/app/not-found.tsx",
    "!src/app/global-error.tsx",
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 80,
      statements: 80,
    },
    // Per-directory thresholds
    "src/components/": {
      branches: 80,
      functions: 85,
      lines: 85,
      statements: 85,
    },
    "src/lib/": {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  moduleNameMapper: {
    // Handle CSS modules
    "\\.(css|less|scss|sass)$": "<rootDir>/src/tests/__mocks__/emptyModule.ts",
    // Handle image imports
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/tests/__mocks__/fileMock.ts",
    // Handle your @/* alias
    "^@/(.*)$": "<rootDir>/src/$1",
    // Handle specific common paths based on typical Next.js structure
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@/assets/(.*)$": "<rootDir>/src/assets/$1",
  },
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  // Add transform ignore patterns for ES modules in node_modules if needed
  transformIgnorePatterns: ["node_modules/(?!(.*\\.mjs$|@testing-library|@babel))"],
  testMatch: ["<rootDir>/src/**/*.spec.(ts|tsx)"],
  testTimeout: 90000,
  verbose: true,
  transform: {
    "^.+.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/src/tests/tsconfig.json",
      },
    ],
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);

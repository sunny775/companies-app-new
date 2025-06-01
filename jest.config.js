import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Path to  Next.js app to load next.config.js and .env files
  dir: "./",
});

const config = {
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.js"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/", "<rootDir>/out/"],
  collectCoverageFrom: [
    "src/components/ui/atoms/**/*.{js,jsx,ts,tsx}",
    "!src/components/**/*.Example.tsx",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 75,
      lines: 80,
      statements: 80,
    },
    "src/components/ui/atoms": {
      branches: 70,
      functions: 80,
      lines: 85,
      statements: 85,
    },
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/src/tests/__mocks__/emptyModule.ts",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/tests/__mocks__/fileMock.ts",
    // Handle your @/* alias
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@/assets/(.*)$": "<rootDir>/src/assets/$1",
  },
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  transformIgnorePatterns: ["node_modules/(?!(.*\\.mjs$|@testing-library|@babel))"],
  testMatch: ["<rootDir>/src/**/*.spec.(ts|tsx)"],
  testTimeout: 90000,
  verbose: true,
};

export default createJestConfig(config);
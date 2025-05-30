module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|js|mjs|html)$": "ts-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!@angular|rxjs)", // Allow transforming Angular & RxJS ESM packages
  ],
  moduleFileExtensions: ["ts", "html", "js", "json", "mjs"],
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  transformIgnorePatterns: [
    "node_modules/(?!@angular|rxjs)", // <-- let Jest transform Angular and RxJS packages
  ],
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy",
    "\\.(html)$": "<rootDir>/src/__mocks__/htmlMock.js",
    "^src/(.*)$": "<rootDir>/src/$1",
  },
};

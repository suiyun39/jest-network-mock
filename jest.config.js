module.exports = {
  preset: "ts-jest",
  bail: true,
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/**/*.spec.ts"],
  collectCoverage: true,
};

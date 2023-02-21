/**
 * https://jestjs.io/zh-Hans/docs/configuration
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
}

export default config

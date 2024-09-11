/** @type {import('ts-jest').JestConfigWithTsJest} */
const CONFIG = {
  preset: '@shelf/jest-mongodb',
  testPathIgnorePatterns: ['build', 'node_modules'],
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setupFileAfterEnv.ts'],
  testTimeout: 15_000,
  maxWorkers: 4,
  maxConcurrency: 5,
  workerThreads: false,
  workerIdleMemoryLimit: '1GB',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}

module.exports = CONFIG

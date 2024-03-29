module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: ['src/**/*.ts'],
  testEnvironment: 'node',
  testMatch: [
    '**/?(*.)+(spec).ts',
  ],
  moduleNameMapper: {
    '^@zup-it/nimbus-backend-core$': '<rootDir>../core/src',
    '^@zup-it/nimbus-backend-core/(.*)$': '<rootDir>../core/src/$1',
    '^src$': '<rootDir>/src',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/__tests__/$1',
  },
  setupFilesAfterEnv: ['jest-extended'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/__tests__/tsconfig.json',
    },
  },
}

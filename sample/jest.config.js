module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/?(*.)+(spec).ts',
  ],
  moduleNameMapper: {
    '^@zup-it/nimbus-backend-core$': '<rootDir>../core/src',
    '^@zup-it/nimbus-backend-core/(.*)$': '<rootDir>../core/src/$1',
    '^@zup-it/nimbus-backend-express$': '<rootDir>../express-client/src',
    '^@zup-it/nimbus-backend-express/(.*)$': '<rootDir>../express-client/src/$1',
  },
}

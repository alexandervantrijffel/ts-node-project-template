module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  coverageReporters: ['html', 'lcov'],
  setupFiles: ['./jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/.build/'],
}

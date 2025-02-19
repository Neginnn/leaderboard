module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', // Or "jsdom" for frontend tests
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};

module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./testSetup.ts'],
  reporters: ['detox/runners/jest/streamlineReporter'],
  verbose: true,
};

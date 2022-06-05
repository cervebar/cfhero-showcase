module.exports = {
  preset: 'react-native',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {},
  cacheDirectory: '.jest/cache',
  testPathIgnorePatterns: ['<rootDir>/e2e/', '<rootDir>/node_modules/'],
};

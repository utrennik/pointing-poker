module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    '^@components(.*)$': "<rootDir>/src/components$1",
    '^@assets(.*)$' : "<rootDir>/src/assets$1",
    '^@models(.*)$' : "<rootDir>/src/models$1",
    '^@src(.*)$' : "<rootDir>/src$1",
    '^@utils(.*)$' : "<rootDir>/src/utils$1",
    '^@styles(.*)$' : "<rootDir>/src/styles$1",

  },
  clearMocks: true,
  collectCoverage: false,
  coverageProvider: 'v8',
  moduleFileExtensions: [
    "js",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],
  setupFilesAfterEnv: ['<rootDir>/src/jest-setup.ts'],
  testEnvironment: 'jsdom',
};

module.exports = {
  collectCoverageFrom: ['src/view/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^.+.(svg|png|jpg)$': 'jest-transform-stub',
    '^@vscode/webview-ui-toolkit/react$': '<rootDir>/__mocks__/vscodeStub.js',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.svg$': 'jest-transform-stub',
  },
};

import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testRegex: '.*/tests/.*.(t|j)sx?$',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
  collectCoverageFrom: ['src/**/*.[jt]s?(x)'],
};

export default config;

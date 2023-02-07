import type { Config } from '@jest/types';

export default {
  displayName: 'common',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  coverageDirectory: '../../coverage/libs/common',
  coverageReporters: ['text'],
  coveragePathIgnorePatterns: ['/node_modules/'],
} as Config.InitialOptions;

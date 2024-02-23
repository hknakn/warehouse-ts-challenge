import type { JestConfigWithTsJest } from "ts-jest";

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
} satisfies JestConfigWithTsJest;

import type { Config } from '@jest/types';
import { getJestProjects } from '@nrwl/jest';

export default {
  projects: getJestProjects(),
} as Config.InitialOptions;

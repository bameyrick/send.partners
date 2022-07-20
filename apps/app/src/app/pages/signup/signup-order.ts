import { AppPath } from '@common';

export const signupOrder: AppPath[] = [
  // AppPath.Signup MUST be first
  AppPath.Signup,
  // AppPath.Signup MUST be second
  AppPath.SignupVerify,
  AppPath.SignupName,
  AppPath.SignupLocation,
];

const missingPaths = Object.values(AppPath).filter(path => path.includes(AppPath.Signup) && !signupOrder.includes(path));

if (missingPaths.length) {
  throw new Error(`Missing signupOrder paths: ${missingPaths.join(', ')}`);
}

import { AppPath } from '@common';
import { selectProfile } from '@common-ui';
import { Store } from '@ngrx/store';
import { Dictionary, isEmpty } from '@qntm-code/utils';
import { map, Observable } from 'rxjs';

export const signupRules: Dictionary<(store: Store) => Observable<boolean>> = {
  [AppPath.Signup]: store => store.select(selectProfile).pipe(map(profile => !!profile)),
  [AppPath.SignupVerify]: store => store.select(selectProfile).pipe(map(profile => !!profile?.email_verified)),
  [AppPath.SignupName]: store => store.select(selectProfile).pipe(map(profile => !isEmpty(profile?.name))),
  [AppPath.SignupLocation]: store => store.select(selectProfile).pipe(map(profile => !isEmpty(profile?.locations))),
};

const ruleKeys = Object.keys(signupRules);

const missingRules = Object.keys(AppPath).filter(path => path.includes(AppPath.Signup) && !ruleKeys.includes(path));

if (missingRules.length) {
  throw new Error(`Missing signup rules for paths: ${missingRules.join(', ')}`);
}

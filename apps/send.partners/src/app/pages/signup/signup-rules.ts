import { Store } from '@ngrx/store';
import { Dictionary, isEmpty } from '@qntm-code/utils';
import { map, Observable } from 'rxjs';
import { selectAuthTokens, selectProfile } from '../../auth';
import { AppPath } from '../../routing';

export const signupRules: Dictionary<(store: Store) => Observable<boolean>> = {
  [AppPath.Signup]: store => store.select(selectAuthTokens).pipe(map(tokens => !!tokens)),
  [AppPath.SignupVerify]: store => store.select(selectProfile).pipe(map(profile => !!profile?.emailVerified)),
  [AppPath.SignupName]: store => store.select(selectProfile).pipe(map(profile => !isEmpty(profile?.name))),
  [AppPath.SignupLocation]: store => store.select(selectProfile).pipe(map(profile => !isEmpty(profile?.locations))),
};

const ruleKeys = Object.keys(signupRules);

const missingRules = Object.keys(AppPath).filter(path => path.includes(AppPath.Signup) && !ruleKeys.includes(path));

if (missingRules.length) {
  throw new Error(`Missing signup rules for paths: ${missingRules.join(', ')}`);
}
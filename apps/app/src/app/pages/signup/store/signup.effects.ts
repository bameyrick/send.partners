import { Injectable } from '@angular/core';
import { AuthActions, selectAuthUser } from '@common-ui';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, of, switchMap, withLatestFrom } from 'rxjs';

import { SignupActions } from './signup.actions';

@Injectable()
export class SignupEffects {
  constructor(private readonly actions$: Actions, private readonly store: Store) {}

  public setName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignupActions.setName),
      withLatestFrom(this.store.select(selectAuthUser).pipe(filter(authUser => !!authUser))),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      switchMap(([{ name }, authUser]) => of(AuthActions.updateAuthUser({ user: { ...authUser!, name } })))
    )
  );

  public setLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignupActions.setLocation),
      withLatestFrom(this.store.select(selectAuthUser).pipe(filter(authUser => !!authUser))),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      switchMap(([{ location }, authUser]) => of(AuthActions.updateAuthUser({ user: { ...authUser!, locations: [location] } })))
    )
  );
}

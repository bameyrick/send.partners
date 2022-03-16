import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { APIEndpoint, JwtTokens } from '@send.partners/common';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { AuthActions } from './auth.actions';
import { selectAuthTokens } from './auth.selectors';

@Injectable()
export class AuthEffects {
  constructor(private readonly actions$: Actions, private readonly store: Store, private readonly http: HttpClient) {}

  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(credentials =>
        this.http.post<JwtTokens>(APIEndpoint.Login, credentials).pipe(
          map(
            tokens => AuthActions.loginSuccess({ tokens }),
            catchError(() => of(AuthActions.loginFailed()))
          )
        )
      )
    )
  );

  public logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.http.get<void>(APIEndpoint.Logout).pipe(
          map(
            () => AuthActions.logoutSuccess(),
            catchError(() => of(AuthActions.loginFailed()))
          )
        )
      )
    )
  );

  public refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      withLatestFrom(this.store.select(selectAuthTokens)),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      switchMap(([_, tokens]) =>
        this.http
          .get<JwtTokens>(APIEndpoint.RefreshTokens, { headers: new HttpHeaders({ authorization: tokens?.refresh_token || '' }) })
          .pipe(
            map(tokens => AuthActions.refreshTokenSuccess({ tokens })),
            catchError(() => of(AuthActions.refreshTokenFailed()))
          )
      )
    )
  );
}

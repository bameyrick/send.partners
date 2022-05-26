import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { APIEndpoint, JwtTokens, User } from '@send.partners/common';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { AuthActions } from './auth.actions';
import { AUTH_TOKEN_STORAGE_KEY } from './auth.reducer';
import { selectAuthTokens } from './auth.selectors';

@Injectable()
export class AuthEffects {
  constructor(private readonly actions$: Actions, private readonly store: Store, private readonly http: HttpClient) {}

  public signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap(({ credentials }) =>
        this.http.post<JwtTokens>(APIEndpoint.SignUp, credentials).pipe(
          map(tokens => AuthActions.signUpSuccess({ tokens })),
          catchError(({ error }) => of(AuthActions.signUpFailed({ errorCode: error.message })))
        )
      )
    )
  );

  public signUpSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpSuccess),
      switchMap(({ tokens }) => of(AuthActions.storeTokens({ tokens })))
    )
  );

  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }) =>
        this.http.post<JwtTokens>(APIEndpoint.Login, credentials).pipe(
          map(tokens => AuthActions.loginSuccess({ tokens })),
          catchError(({ error }) => of(AuthActions.loginFailed({ errorCode: error.message })))
        )
      )
    )
  );

  public loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      switchMap(({ tokens }) => of(AuthActions.storeTokens({ tokens })))
    )
  );

  public logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.http.get<void>(APIEndpoint.Logout).pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError(() => of(AuthActions.logoutFailed()))
        )
      )
    )
  );

  public refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      withLatestFrom(this.store.select(selectAuthTokens)),
      switchMap(([_, tokens]) =>
        this.http
          .get<JwtTokens>(APIEndpoint.RefreshTokens, { headers: new HttpHeaders({ Authorization: `Bearer ${tokens?.refresh_token}` }) })
          .pipe(
            map(tokens => AuthActions.refreshTokenSuccess({ tokens })),
            catchError(() => of(AuthActions.refreshTokenFailed()))
          )
      )
    )
  );

  public refreshTokenSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshTokenSuccess),
      switchMap(({ tokens }) => of(AuthActions.storeTokens({ tokens })))
    )
  );

  public storeTokens$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.storeTokens),
      switchMap(({ tokens }) => {
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, JSON.stringify(tokens));

        return of(AuthActions.getProfile());
      })
    )
  );

  public getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getProfile),
      switchMap(() =>
        this.http.get<User>(APIEndpoint.MyProfile).pipe(
          map(profile => AuthActions.getProfileSuccess({ profile })),
          catchError(() => of(AuthActions.getProfileFailed()))
        )
      )
    )
  );

  public verifyEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.verifyEmail),
      switchMap(({ code }) =>
        this.http.post<User>(APIEndpoint.VerifyEmail, { code }).pipe(
          map(profile => AuthActions.verifyEmailSuccess({ profile })),
          catchError(({ error }) => of(AuthActions.verifyEmailFailed({ errorCode: error.message })))
        )
      )
    )
  );

  public resendEmailVerification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resendEmailVerification),
      switchMap(() =>
        this.http.post<number>(APIEndpoint.ResendEmailVerification, null).pipe(
          map(retryEnables => AuthActions.resendEmailVerificationSuccess({ retryEnables: new Date(retryEnables) })),
          catchError(({ error }) => of(AuthActions.resendEmailVerificationFailed({ retryEnables: new Date(parseInt(error.error)) })))
        )
      )
    )
  );
}

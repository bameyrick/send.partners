import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { APIEndpoint, FullUser, JwtTokens } from '@send.partners/common';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { AppPath } from '../../routing';
import { AuthActions } from './auth.actions';
import { AUTH_TOKEN_STORAGE_KEY } from './auth.reducer';
import { selectAuthTokens } from './auth.selectors';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

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
      tap(() => this.router.navigateByUrl(AppPath.SignupName)),
      switchMap(({ tokens }) => of(AuthActions.storeTokens({ tokens })))
    )
  );

  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(credentials =>
        this.http.post<JwtTokens>(APIEndpoint.Login, credentials).pipe(
          map(tokens => AuthActions.loginSuccess({ tokens })),
          catchError(() => of(AuthActions.loginFailed()))
        )
      )
    )
  );

  public logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.http.get<void>(APIEndpoint.Logout).pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError(() => of(AuthActions.loginFailed()))
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
        this.http.get<FullUser>(APIEndpoint.MyProfile).pipe(
          map(profile => AuthActions.getProfileSuccess({ profile })),
          catchError(() => of(AuthActions.getProfileFailed()))
        )
      )
    )
  );
}

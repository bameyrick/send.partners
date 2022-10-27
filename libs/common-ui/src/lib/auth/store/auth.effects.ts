import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppPath, getRouterLinkForAppPath } from '@common';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { AuthActions } from './auth.actions';

export const LOGOUT_REDIRECT_PATH = new InjectionToken<AppPath>('LOGOUT_REDIRECT_PATH');

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    @Inject(LOGOUT_REDIRECT_PATH) private readonly logoutRedirectPath: AppPath
  ) {}

  public refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      switchMap(() =>
        this.authService.refreshTokens().pipe(
          map(user => AuthActions.refreshTokenSuccess({ user })),
          catchError(() => of(AuthActions.refreshTokenFailed()))
        )
      )
    )
  );

  public signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap(({ credentials }) =>
        this.authService.signUp(credentials).pipe(
          map(user => AuthActions.signUpSuccess({ user })),
          catchError(({ error }) => of(AuthActions.signUpFailed({ errorCode: error.message })))
        )
      )
    )
  );

  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(user => AuthActions.loginSuccess({ user })),
          catchError(({ error }) => of(AuthActions.loginFailed({ errorCode: error.message })))
        )
      )
    )
  );

  public loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigateByUrl(this.activatedRoute.snapshot.queryParams['redirect'] || getRouterLinkForAppPath(AppPath.Root)))
      ),
    { dispatch: false }
  );

  public logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError(() => of(AuthActions.logoutFailed()))
        )
      )
    )
  );

  public logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => {
          const url = this.router.routerState.snapshot.url;

          const queryParams =
            this.logoutRedirectPath === AppPath.Login && getRouterLinkForAppPath(AppPath.Root) !== url ? { redirect: url } : undefined;

          this.router.navigate([this.logoutRedirectPath], { queryParams });
        })
      ),
    { dispatch: false }
  );

  public verifyEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.verifyEmail),
      switchMap(({ code }) =>
        this.authService.verifyEmail(code).pipe(
          map(user => AuthActions.verifyEmailSuccess({ user })),
          catchError(({ error }) => of(AuthActions.verifyEmailFailed({ errorCode: error.message })))
        )
      )
    )
  );

  public resendEmailVerification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resendEmailVerification),
      switchMap(() =>
        this.authService.resendVerificationEmail().pipe(
          map(retryEnables => AuthActions.resendEmailVerificationSuccess({ retryEnables: new Date(retryEnables) })),
          catchError(({ error }) => of(AuthActions.resendEmailVerificationFailed({ retryEnables: new Date(parseInt(error.error)) })))
        )
      )
    )
  );

  public updateAuthUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateAuthUser),
      switchMap(({ user }) =>
        this.authService.updateAuthUser(user).pipe(
          map(updatedUser => AuthActions.updateAuthUserSuccess({ user: updatedUser })),
          catchError(({ error }) => of(AuthActions.updateAuthUserFailed({ errorCode: error.message })))
        )
      )
    )
  );

  public requestPasswordReset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.requestPasswordReset),
      switchMap(credentials =>
        this.authService.requestPasswordReset(credentials).pipe(
          map(() => AuthActions.requestPasswordResetSuccess(credentials)),
          catchError(({ error }) => of(AuthActions.requestPasswordResetFailed({ errorCode: error.message })))
        )
      )
    )
  );

  public requestPasswordResetSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.requestPasswordResetSuccess),
        tap(({ email }) => this.router.navigateByUrl(`${getRouterLinkForAppPath(AppPath.RequestPasswordResetSuccess)}?email=${email}`))
      ),
    { dispatch: false }
  );

  public resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      switchMap(({ credentials }) =>
        this.authService.resetPassword(credentials).pipe(
          map(() => AuthActions.resetPasswordSuccess()),
          catchError(({ error }) => of(AuthActions.resetPasswordFailed({ errorCode: error.message })))
        )
      )
    )
  );

  public resetPasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.resetPasswordSuccess),
        tap(() => this.router.navigateByUrl(getRouterLinkForAppPath(AppPath.ResetPasswordSuccess)))
      ),
    { dispatch: false }
  );
}

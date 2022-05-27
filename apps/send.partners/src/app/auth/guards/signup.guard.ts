import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { getRouterLinkForAppPath } from '@send.partners/common';
import { firstValueFrom, map, skipWhile } from 'rxjs';
import { AppPath } from '../../routing';
import { selectAuthTokens, selectInitialRefreshCompleted, selectProfile } from '../store';

@Injectable({ providedIn: 'root' })
export class SignUpGuard implements CanActivate, CanActivateChild {
  constructor(private readonly store: Store, private readonly router: Router) {}

  public async canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return await this.signUpCompleted(state.url);
  }

  public async canActivateChild(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return await this.signUpCompleted(state.url);
  }

  private async signUpCompleted(url: string): Promise<boolean | UrlTree> {
    await firstValueFrom(this.store.select(selectInitialRefreshCompleted).pipe(skipWhile(completed => !completed)));

    if (
      url !== getRouterLinkForAppPath(AppPath.Signup) &&
      (await firstValueFrom(this.store.select(selectAuthTokens).pipe(map(tokens => !!tokens))))
    ) {
      const profile = await firstValueFrom(this.store.select(selectProfile));

      if (!profile?.emailVerified) {
        return this.router.parseUrl(AppPath.Signup);
      }
    }

    return true;
  }
}

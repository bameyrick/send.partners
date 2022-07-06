import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { asyncEvery, getRouterLinkForAppPath } from '@send.partners/common';
import { firstValueFrom, map, skipWhile } from 'rxjs';
import { signupOrder } from '../../pages/signup/signup-order';
import { signupRules } from '../../pages/signup/signup-rules';
import { AppPath } from '../../routing';
import { selectAuthTokens, selectInitialRefreshCompleted } from '../store';

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

    const hasTokens = await firstValueFrom(this.store.select(selectAuthTokens).pipe(map(tokens => !!tokens)));

    const signupPath = getRouterLinkForAppPath(AppPath.Signup);

    if (url.includes(signupPath) && url !== signupPath && !hasTokens) {
      return this.router.parseUrl(AppPath.Signup);
    }

    if (hasTokens) {
      for (let pathIndex = 1, l = signupOrder.length; pathIndex < l; pathIndex++) {
        const path = signupOrder[pathIndex];

        const rules = signupOrder.filter((_, ruleIndex) => ruleIndex > 0 && ruleIndex <= pathIndex).map(path => signupRules[path]);

        const lastRuleIndex = rules.length - 1;

        if (
          (await asyncEvery(
            rules,
            async (rule, ruleIndex) =>
              (await firstValueFrom(rule(this.store))) === (pathIndex === 1 || ruleIndex === lastRuleIndex ? false : true)
          )) &&
          url !== getRouterLinkForAppPath(path)
        ) {
          return this.router.parseUrl(path);
        }
      }
    }

    return true;
  }
}

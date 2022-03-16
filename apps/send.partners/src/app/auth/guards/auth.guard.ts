import { Injectable } from '@angular/core';
import { CanActivateChild, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { AuthActions, selectAuthTokens } from '../store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivateChild {
  constructor(private readonly store: Store) {}

  public async canActivateChild(): Promise<boolean | UrlTree> {
    if (await firstValueFrom(this.store.select(selectAuthTokens))) {
      return true;
    }

    this.store.dispatch(AuthActions.logout());

    return false;
  }
}

import { Injectable } from '@angular/core';
import { CanActivateChild, Router, UrlTree } from '@angular/router';
import { AppPath } from '@common';
import { selectAuthenticated } from '../store';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivateChild {
  constructor(private readonly store: Store, private readonly router: Router) {}

  public async canActivateChild(): Promise<boolean | UrlTree> {
    if (!(await firstValueFrom(this.store.select(selectAuthenticated)))) {
      this.router.navigate([AppPath.Signup]);

      return true;
    }

    return false;
  }
}

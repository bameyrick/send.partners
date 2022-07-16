import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, UrlTree } from '@angular/router';
import { AppPath } from '@common';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { selectAuthenticated } from '../store';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivateChild {
  constructor(private readonly store: Store, private readonly router: Router) {}

  public async canActivateChild(next: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
    if (!(await firstValueFrom(this.store.select(selectAuthenticated)))) {
      console.log(next);
      this.router.navigate([AppPath.Signup]);

      return true;
    }

    return false;
  }
}

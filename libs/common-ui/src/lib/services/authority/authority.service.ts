import { Injectable } from '@angular/core';
import { Authority, hasAuthority, User } from '@common';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { selectProfile } from '../../auth';

@Injectable({
  providedIn: 'root',
})
export class AuthorityService {
  constructor(private readonly store: Store) {}

  public async hasAuthority(authority: Authority, user?: User): Promise<boolean> {
    if (!user) {
      user = await firstValueFrom(this.store.select(selectProfile));
    }

    if (user) {
      return hasAuthority(authority, user);
    }

    return false;
  }
}

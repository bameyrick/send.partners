import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom, skipWhile } from 'rxjs';
import { AuthActions, selectInitialRefreshCompleted } from '../../auth';

@Injectable({
  providedIn: 'root',
})
export class AppLoadService {
  constructor(private readonly store: Store) {}

  public async initializeApp(): Promise<void> {
    this.store.dispatch(AuthActions.refreshToken());

    await firstValueFrom(this.store.select(selectInitialRefreshCompleted).pipe(skipWhile(completed => !completed)));
  }
}

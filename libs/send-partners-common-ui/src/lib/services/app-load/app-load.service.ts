import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppLoadService {
  public initializeApp(): void {
    console.log('INITIALISE');
  }
}

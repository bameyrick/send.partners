import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIEndpoint } from '@send.partners/common';

@Injectable({
  providedIn: 'root',
})
export class AppLoadService {
  constructor(private readonly http: HttpClient) {}

  public async initializeApp(): Promise<void> {
    await this.setCsrfCookie();
  }

  private async setCsrfCookie(): Promise<void> {
    this.http.get(APIEndpoint.Csrf).subscribe();
  }
}

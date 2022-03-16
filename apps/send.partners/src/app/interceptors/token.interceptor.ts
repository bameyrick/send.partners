import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { firstValueFrom, from, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthTokens } from '../auth';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store) {}

  /**
   * Intercepts http requests and applies a bearer token
   */
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.handle(request, next));
  }

  private async handle(request: HttpRequest<unknown>, next: HttpHandler): Promise<HttpEvent<unknown>> {
    if (!request.headers.get('authorization')) {
      const tokens = await firstValueFrom(this.store.select(selectAuthTokens));

      if (tokens) {
        request = request.clone({ setHeaders: { Authorization: `Bearer ${tokens.access_token}` } });
      }
    }

    return await firstValueFrom(next.handle(request));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIEndpoint, LoginCredentials, User } from '@common';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  public refreshTokens(): Observable<User> {
    return this.http.get<User>(APIEndpoint.RefreshTokens);
  }

  public signUp(credentials: LoginCredentials): Observable<User> {
    return this.http.post<User>(APIEndpoint.SignUp, credentials);
  }

  public login(credentials: LoginCredentials): Observable<User> {
    return this.http.post<User>(APIEndpoint.Login, credentials);
  }

  public logout(): Observable<void> {
    return this.http.get<void>(APIEndpoint.Logout);
  }

  public verifyEmail(code: string): Observable<User> {
    return this.http.post<User>(APIEndpoint.VerifyEmail, { code });
  }

  public resendVerificationEmail(): Observable<number> {
    return this.http.post<number>(APIEndpoint.ResendEmailVerification, null);
  }

  public updateProfile(user: User): Observable<User> {
    return this.http.put<User>(APIEndpoint.MyProfile, user);
  }
}

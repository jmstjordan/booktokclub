import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';
  private authStatus = new BehaviorSubject<boolean>(this.hasValidRefreshToken());
  private apiUrl = environment.bookboostApi;
  isRefreshing = false;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ access_token: string, refresh_token: string }>(`${this.apiUrl}/api/Auth/Login`, credentials).pipe(
      tap(response => {
        console.log(response)
        this.setToken(response.access_token);
        this.setRefreshToken(response.refresh_token);
        this.authStatus.next(true);
      })
    );
  }

  signup(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ access_token: string, refresh_token: string }>(`${this.apiUrl}/api/Auth/Signup`, credentials).pipe(
      tap(response => {
        this.setToken(response.access_token);
        this.setRefreshToken(response.refresh_token);
        this.authStatus.next(true);
      })
    );
  }

  logout(): void {
    this.setToken(null);
    this.setRefreshToken(null);
    this.authStatus.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  refreshToken(): Observable<{ access_token: string, refresh_token: string }> {
    this.isRefreshing = true;
    return this.http.post<{ access_token: string, refresh_token: string }>(
      `${this.apiUrl}/api/Auth/Refresh`,
      { refreshToken: this.getRefreshToken() }
    );
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    return sessionStorage.getItem(this.refreshTokenKey)!;
  }

  setToken(token: string | null): void {
    if (token) {
      sessionStorage.setItem(this.tokenKey, token);
    } else {
      sessionStorage.removeItem(this.tokenKey);
    }
  }

  setRefreshToken(token: string | null): void {
    if (token) {
      sessionStorage.setItem(this.refreshTokenKey, token);
    } else {
      sessionStorage.removeItem(this.refreshTokenKey);
    }
  }

  private hasValidRefreshToken(): boolean {
    const refreshToken = this.getRefreshToken();
    return refreshToken != null;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';
  private authStatus = new BehaviorSubject<boolean>(this.hasValidRefreshToken());
  private refreshTokenInProgress: Observable<string> | null = null;
  private apiUrl = environment.bookboostApi;
  isRefreshing = false;

  constructor(private http: HttpClient) {}

  login(email: string, password: string, role: string): Observable<any> {
    let payload = {
      email: email,
      password: password,
      role: role
    };
    return this.http.post<{ access_token: string, refresh_token: string }>(`${this.apiUrl}/Auth/Login`, payload).pipe(
      tap(response => {
        console.log(response)
        this.setToken(response.access_token);
        this.setRefreshToken(response.refresh_token);
        this.authStatus.next(true);
      })
    );
  }

  signup(email: string, password: string, role: string): Observable<any> {
    let payload = {
      email: email,
      password: password,
      role: role
    };
    return this.http.post<{ access_token: string, refresh_token: string }>(`${this.apiUrl}/Auth/Signup`, payload).pipe(
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
    return this.http.post<{ access_token: string, refresh_token: string }>(
      `${this.apiUrl}/Auth/Refresh`,
      { token: this.getRefreshToken() }
    );
  }

  getSharedRefreshToken(): Observable<string> {
    if (!this.refreshTokenInProgress) {
      this.refreshTokenInProgress = this.refreshToken().pipe(
        tap((res) => {
          this.setToken(res.access_token);
          this.setRefreshToken(res.refresh_token);
        }),
        map((res) => res.access_token),
        finalize(() => {
          this.refreshTokenInProgress = null; // allow future refreshes
        }),
        shareReplay(1) // share result with all pending subscribers
      );
    }
    return this.refreshTokenInProgress;
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

  getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    const decoded = jwtDecode(token) as any;
    const rawRoles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const roles = Array.isArray(rawRoles) ? rawRoles : [rawRoles]; 
    return Array.isArray(roles) ? roles : [roles];
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }
}

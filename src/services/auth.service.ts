import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private tokenKey = 'auth_token';
  private authStatus = new BehaviorSubject<boolean>(this.hasValidToken());
  private apiUrl = environment.bookboostApi;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/api/Auth/Login`, credentials).pipe(
      tap(response => {
        this.setToken(response.token);
        this.authStatus.next(true);
      })
    );
  }

  signup(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/api/Auth/Signup`, credentials).pipe(
      tap(response => {
        this.setToken(response.token);
        this.authStatus.next(true);
      })
    );
  }

  logout(): void {
    this.setToken(null);
    this.authStatus.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  private setToken(token: string | null): void {
    if (token) {
      sessionStorage.setItem(this.tokenKey, token);
    } else {
      sessionStorage.removeItem(this.tokenKey);
    }
  }

  private hasValidToken(): boolean {
    const token = sessionStorage.getItem(this.tokenKey);
    return !!token; // You can add expiration validation here if needed
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(provider: string, role: string): void {
    window.location.href = `${window.location.origin}/.auth/login/${provider}?post_login_redirect_uri=/${role}`;
  }

  logout(): void {
    window.location.href = `${window.location.origin}/.auth/logout?post_logout_redirect_uri=/`;
  }

  getUser(): Observable<any> {
    return this.http.get('/.auth/me');
  }
}

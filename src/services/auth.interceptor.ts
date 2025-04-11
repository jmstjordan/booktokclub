import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Add Authorization header if token exists
    const accessToken = this.authService.getToken();

    let authReq = req;
    if (accessToken) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    // Handle request
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.includes('/Auth/Login') && !req.url.includes('/Auth/Refresh') && !this.authService.isRefreshing) {
          // Try refreshing the token
          return this.authService.refreshToken().pipe(
            switchMap((response) => {
              // Save the new access token
              this.authService.setToken(response.access_token);
              this.authService.setRefreshToken(response.refresh_token);
              // Retry the original request with new token
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.access_token}`
                }
              });
              this.authService.isRefreshing = false;
              return next.handle(retryReq);
            }),
            catchError((err) => {
              this.authService.isRefreshing = false;
              this.authService.logout(); // Optionally redirect to login
              return throwError(() => err);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}

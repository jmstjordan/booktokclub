import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map(isAuth => {
        const pathBase = route.url[0].path;
        // this assumes we have a base, which is true for now for all authguards
        // we call this on author, reader, and success, all which require auth.
        if (!isAuth) {
          this.router.navigate([pathBase]);
          return false;
        }
        return true;
      })
    );
  }
}

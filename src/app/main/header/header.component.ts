import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SocialLoginComponent } from '../social-login/social-login.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, SocialLoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean>;
  @Input() role!: string;

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute){
    this.isLoggedIn$ = this.authService.isAuthenticated();
  }

  home(event: any){
    this.router.navigate(['/']);
  }

  routeSignup(){
    this.router.navigate(['/']);
  }

  routeLogin(){
    this.router.navigate(['login', this.role]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

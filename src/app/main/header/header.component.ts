import { Component } from '@angular/core';
import { SignUpButtonComponent } from './sign-up-button/sign-up-button.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [SignUpButtonComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(private router: Router, private authService: AuthService){
    this.isLoggedIn$ = this.authService.isAuthenticated();
  }

  home(){
    this.router.navigate(['/']);
  }

  logout() {
    this.authService.logout();
  }
}

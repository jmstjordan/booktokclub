import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean>;
  role!: string;

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

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-google-callback',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './google-callback.component.html',
  styleUrl: './google-callback.component.scss'
})
export class GoogleCallbackComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router){

  }

  ngOnInit() {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const idToken = fragment.get('id_token');
    const role = fragment.get('state');
    
    if (idToken) {
      this.authService.loginWithGoogle(idToken, role as string);
    } else {
      this.router.navigate(["/"]);
    }
  }
}

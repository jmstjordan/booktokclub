import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  user: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    
    this.authService.getUser().subscribe((user) => {
      console.log(user);
      if(user.clientPrincipal !== null){
        this.user = user;
        // TODO: check user information from database and send to their role
        this.router.navigate(['/author']);
      }else{
        this.user = null;
      }
    });
  }

  login(provider: string, role: string): void {
    this.authService.login(provider, role);
  }
}
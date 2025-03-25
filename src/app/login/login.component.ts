import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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
        // maybe revisit this. what default behavior do we want?
        // this.router.navigate(['/author/home']);
      }else{
        this.user = null;
      }
    });
  }

  login(provider: string, role: string): void {
    this.authService.login(provider, role);
  }
}
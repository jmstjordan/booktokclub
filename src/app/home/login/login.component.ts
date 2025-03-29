import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  @Input() splash!: string;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {

  }

  login(provider: string): void {
    this.authService.login(provider, this.splash);
  }
}
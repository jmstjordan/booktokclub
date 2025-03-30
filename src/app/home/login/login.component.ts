import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  @Input() splash!: string;
  loginForm!: FormGroup;

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(provider: string): void {
    this.authService.login(provider, this.splash);
  }

  signup(){
    this.router.navigate([`/signup/${this.splash}`]);
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);
      // Call API for authentication here
      alert('Login successful!');
      this.login("github");
      this.router.navigate([this.splash, "6cddacf31698df7f17806e5de5a157e7"]);
    }
  }
}
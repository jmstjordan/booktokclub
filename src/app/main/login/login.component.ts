import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  role!: string;

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params=> {
      this.role = params.get("role") as string;
    });    
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signup(){
    this.router.navigate([`/signup/${this.role}`]);
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);
      this.authService.login(this.loginForm.value["email"], this.loginForm.value["password"], this.role)
        .subscribe(result => this.router.navigate([this.role, "home"]));
      ;
    }
  }
}
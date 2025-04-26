import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SocialLoginComponent } from '../social-login/social-login.component';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, SocialLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  role!: string;
  isLoading = false;

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder, private route: ActivatedRoute, private toastService: ToastService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params=> {
      this.role = params.get("role") as string;
    });    
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  routeSignup(){
    this.router.navigate([`/signup/${this.role}`]);
  }

  routePasswordReset(){
    this.router.navigate(["/forgot-password"]);
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value["email"], this.loginForm.value["password"], this.role)
        .subscribe(
          {
            next: () => {this.router.navigate([this.role, "home"]); this.isLoading = false;},
            error: () => {
              this.isLoading = false; 
              this.toastService.show('Invalid Credentials!', 'error');
            },
          }
        );
    }
  }
}
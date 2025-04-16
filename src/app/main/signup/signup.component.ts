import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  role!: string;
  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params=> {
      this.role = params.get("role") as string;
    });
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator to check if password and confirmPassword match
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  routeLogin(){
    this.router.navigate(['login', this.role]);
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.authService.signup(this.signupForm.value["email"], this.signupForm.value["password"], this.role)
        .subscribe(
          {
            next: () => {this.router.navigate([this.role, "home"]); this.isLoading = false},
            error: () => this.isLoading = false
          }
        );    
    }
  }
}

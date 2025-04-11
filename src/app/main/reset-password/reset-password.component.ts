import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookBoostService } from '../../../services/bookboost.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  email: string = '';
  form!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookBoostService,
    private authService: AuthService
  ) {
    this.form = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    this.email = this.route.snapshot.queryParamMap.get('email') || '';

    if(this.token == '' || this.email == ''){
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (this.form.invalid){
      return;
    }
    this.isLoading = true;

    this.bookService.resetPassword(
      this.email,
      this.form.value.password,
      this.token,
    ).subscribe({
      next: () => {
        this.isLoading = false;
        if(this.authService.hasRole("reader")){
          setTimeout(() => this.router.navigate(['login', "reader"]), 2000);
        }else if(this.authService.hasRole("author")){
          setTimeout(() => this.router.navigate(['login', "author"]), 2000);
        }else{
          setTimeout(() => this.router.navigate(['/']), 2000);
        }
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
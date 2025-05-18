import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookBoostService } from '../../../services/bookboost.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  forgotPasswordForm!: FormGroup; 
  isLoading = false;
  success = false;

  constructor(private fb: FormBuilder, private bookService: BookBoostService, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  navigate(){
    this.router.navigate(['login', 'reader']);
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid){
      return;
    }
    this.isLoading = true;
    this.bookService.forgotPassword(this.forgotPasswordForm.value["email"])
      .subscribe( {next:() => {this.success = true; this.isLoading = false}, error: () => this.isLoading = false});
  }
}
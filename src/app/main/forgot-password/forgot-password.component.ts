import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookBoostService } from '../../../services/bookboost.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ToastService } from '../../../services/toast.service';

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

  constructor(private fb: FormBuilder, private bookService: BookBoostService, private router: Router, private toastService: ToastService) {
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
      .subscribe( {next:() => {
        this.isLoading = false; 
        this.toastService.show("Success! Please check your email", "success");
      }, error: () => {
        this.isLoading = false;
        this.toastService.show("Unable to reset password. Please contact support@booktokusa.com", "error");
      }});
  }
}
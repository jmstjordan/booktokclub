import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookBoostService } from '../../../services/bookboost.service';
import { ToastService } from '../../../services/toast.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SocialLoginComponent } from '../social-login/social-login.component';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SocialLoginComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  emailForm!: FormGroup;
  isLoggedIn = false;

  constructor(private bookboost: BookBoostService, private fb: FormBuilder, private toastService: ToastService, private router: Router, private authService: AuthService){
    this.authService.isAuthenticated().subscribe((res) => this.isLoggedIn = res);
  }

  ngOnInit(){ 
    this.emailForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
      },
    );
  }

  navigate(path: string){
    if(this.isLoggedIn){
      this.router.navigate([path, 'home']).then(() => {
        window.scrollTo(0, 0);
      });
    }else{
      this.router.navigate([path]).then(() => {
        window.scrollTo(0, 0);
      });
    }
  }

  addEmail(){
    this.bookboost.addSubscriber(this.emailForm.value["email"]).subscribe({
      next: () => {
        this.toastService.show('Email Added!', 'success');
        this.emailForm.reset();
      },
      error: (res) => {
        if(res.status != 409){
          this.toastService.show('Invalid Email!', 'error');
        }else{
          this.toastService.show('Email already exists!', 'info');
        }
      }
    });
  }
}

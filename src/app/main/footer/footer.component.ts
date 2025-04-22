import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookBoostService } from '../../../services/bookboost.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  emailForm!: FormGroup;

  constructor(private bookboost: BookBoostService, private fb: FormBuilder, private toastService: ToastService){}

  ngOnInit(){
    this.emailForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
      },
    );
  }
  addEmail(){
    this.bookboost.addSubscriber(this.emailForm.value["email"]).subscribe({
      next: () => {
        this.toastService.show('Email Added!', 'success');
        this.emailForm.reset();
      },
      error: () => {
        this.toastService.show('Invalid Email!', 'error');
      }
    });
  }
}

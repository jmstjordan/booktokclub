import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-adform',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adform.component.html',
  styleUrl: './adform.component.scss'
})
export class AdformComponent {

  adForm!: FormGroup;

  categories = [
    "Romance",
    "Fantasy",
    "MysteryThriller",
    "ScienceFiction",
    "YoungAdult",
    "NonFiction"
  ];

  productSources = [
    "Amazon"
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.adForm = this.fb.group({
      asin: ['', Validators.required],
      adDate: ['', Validators.required],
      category: ['', Validators.required],
      productSource: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.adForm.valid) {
      const formData = this.adForm.value;
      console.log('Form Data:', formData);

      // Access individual values
      const { asin, adDate, category, productSource } = formData;
      console.log('ASIN:', asin);
      console.log('Ad Date:', adDate);
      console.log('Category:', category);
      console.log('Single Option:', productSource);
    } else {
      console.log('Form is invalid');
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookBoostService } from '../../../../services/bookboost.service';
import { AdUpload, ProductUpload } from '../../../../interfaces';

@Component({
  selector: 'app-adform',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adform.component.html',
  styleUrl: './adform.component.scss'
})
export class AdformComponent {

  @Output() adCreate = new EventEmitter<any>();
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

  constructor(private fb: FormBuilder, private bookBoostService: BookBoostService) {}

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

      // Access individual values
      const { asin, adDate, category, productSource } = formData;
      let adUpload = {
        adDate: adDate,
        productUpload: {
          productId: asin,
          productSource: productSource
        } as ProductUpload,
        genre: category
      } as AdUpload;
      console.log(adUpload);
      this.bookBoostService.createAd(adUpload).subscribe((result) => {
        // snack bar of success
        this.adCreate.emit(result);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}

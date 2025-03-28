import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookBoostService } from '../../../../services/bookboost.service';
import { AdAvailability, AdUpload, ProductUpload } from '../../../../interfaces';
import { StripeService } from 'ngx-stripe';

@Component({
  selector: 'app-adform',
  imports: [
    CommonModule, ReactiveFormsModule
 ],
  templateUrl: './adform.component.html',
  styleUrl: './adform.component.scss'
})
export class AdformComponent {

  @Output() adCreate = new EventEmitter<any>();
  adForm!: FormGroup;
  checkTitle!: string;
  adAvailability!: AdAvailability[];
  genres = [
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

  errorMessage!: string;

  constructor(private fb: FormBuilder, private bookBoostService: BookBoostService, public stripe: StripeService) {}

  ngOnInit(): void {
    this.adForm = this.fb.group({
      asin: ['', Validators.required],
      adDate: ['', Validators.required],
      genre: ['', Validators.required],
      productSource: ['', Validators.required]
    });
  }

  checkProductId(){
    if(this.adForm.value["asin"] !== "" && this.adForm.value["productSource"] !== ""){
      let upload = {
        productId: this.adForm.value["asin"],
        productSource: this.adForm.value["productSource"]
      } as ProductUpload;
      this.bookBoostService.getProduct(upload).subscribe((data) => {
        console.log(data);
        this.checkTitle = data["title"];
      });
    }
  }
  
  getGenreAvailability(event: Event){
    const selectElement = event.target as HTMLSelectElement;
    let genre = selectElement.value;
    this.bookBoostService.getAdAvailability(genre).subscribe((data) =>{
      this.adAvailability = data;
      console.log(this.adAvailability);
    });
  }

  startExpressCheckout() {
    const formData = this.adForm.value;

    // Access individual values
    const { asin, adDate, genre, productSource } = formData;
    let adUpload = {
      adDate: adDate,
      productUpload: {
        productId: asin,
        productSource: productSource
      } as ProductUpload,
      genre: genre
    } as AdUpload;
    console.log(adUpload);

    this.bookBoostService.createCheckoutSession(adUpload)
      .subscribe((response: any) => {
        if (response?.sessionId) {
          this.stripe.redirectToCheckout({ sessionId: response.sessionId })
            .subscribe((result) => {
              console.log(result);
              if (result.error) {
                this.errorMessage = result.error.message as string;
              }
            });
        } else {
          this.errorMessage = 'Failed to create checkout session';
        }
      });
  }

  onSubmit(): void {
    if (this.adForm.valid) {
      const formData = this.adForm.value;

      // Access individual values
      const { asin, adDate, genre, productSource } = formData;
      let adUpload = {
        adDate: adDate,
        productUpload: {
          productId: asin,
          productSource: productSource
        } as ProductUpload,
        genre: genre
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

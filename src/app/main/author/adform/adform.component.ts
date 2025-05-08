import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookBoostService } from '../../../../services/bookboost.service';
import { AdAvailability, AdUpload, Product, ProductUpload, ProductValidate } from '../../../../interfaces';
import { StripeService } from 'ngx-stripe';
import flatpickr from 'flatpickr';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-adform',
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule
  ],
  templateUrl: './adform.component.html',
  styleUrl: './adform.component.scss'
})
export class AdformComponent implements AfterViewInit {

  @ViewChild('flatpickrInput') input!: ElementRef;
  adPrices!: {};
  productSources!: string[];
  productPrices!: number[];
  adForm!: FormGroup;
  validatedProduct!: Product;
  selectedProductSource = "Amazon";
  isLoading = false;
  startDate = new Date('2025-09-01');

  private flatpickrInstance!: flatpickr.Instance;
  genreSelected = false;

  errorMessage!: string;

  constructor(private fb: FormBuilder, private bookBoostService: BookBoostService, public stripe: StripeService, private toastService: ToastService, private bookboostService: BookBoostService) { }

  ngOnInit(): void {
    this.bookboostService.getPrices().subscribe((adPrices) => this.adPrices = adPrices);
    this.bookboostService.getProductSources().subscribe((productSources) => this.productSources = productSources);
    this.bookboostService.getProductPrices().subscribe((prices) => this.productPrices = prices);

    this.adForm = this.fb.group({
      asin: ['', Validators.required],
      adDate: ['', Validators.required],
      genre: ['', Validators.required],
      productSource: ['', Validators.required],
      productPrice: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', [Validators.required]]
    });
  }


  ngAfterViewInit() {
    setTimeout(() => {
      const maxDate = new Date(this.startDate);
      maxDate.setDate(this.startDate.getDate() + 180);
  
      this.flatpickrInstance = flatpickr(this.input.nativeElement, {
        dateFormat: 'Y-m-d',
        minDate: this.startDate,
        maxDate: maxDate
      });
    }, 1000);
  }

  checkProductId() {
    if (this.adForm.value["asin"] !== "" && this.adForm.value["productSource"] !== "") {
      this.isLoading = true;
      let payload = {
        productId: this.adForm.value["asin"],
        productSource: this.adForm.value["productSource"]
      } as ProductValidate;
      this.bookBoostService.validateProduct(payload).subscribe(
        {
          next: (data) => {
            this.validatedProduct = data;
            console.log(data);
            this.adForm.patchValue({
              title: data.title,
              description: data.description,
            });
            this.isLoading = false;
            // this.adForm.get('asin')?.disable();
            this.toastService.show('Book Retrieved', 'success');
          },
          error: () => {
            this.isLoading = false;
            // this.adForm.get('asin')?.reset();
            this.toastService.show('Unable to find Book!', 'error');
          }
        });
    }
  }

  getGenreAvailability(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    let genre = selectElement.value;
    this.bookBoostService.getAdAvailability(genre).subscribe((data: AdAvailability[]) => {
      let disabledDates: Date[] = [];
      console.log(data)
      data.forEach((x) => {
        if (x.count == 0) {
          let daySplit = x.adDate.split("-");
          // hack to get the timezone to work
          disabledDates.push(new Date(Number(daySplit[0]), Number(daySplit[1]) - 1, Number(daySplit[2])));
        }
      });
      this.flatpickrInstance.set('disable', disabledDates);
      this.genreSelected = true;
    });
  }

  startExpressCheckout() {
    this.isLoading = true;
    const formData = this.adForm.value;

    // Access individual values
    const { asin, adDate, genre, productSource, productPrice, title, description } = formData;
    let adUpload = {
      adDate: adDate,
      productUpload: {
        productId: asin,
        productSource: productSource,
        titleView: title,
        descriptionView: description,
        offerPrice: productPrice
      } as ProductUpload,
      genre: genre,
    } as AdUpload;
    console.log(adUpload);

    this.bookBoostService.createCheckoutSession(adUpload)
      .subscribe( 
        {
          next: (response: any) => {
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
            this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.toastService.show('Unable to create Ad!', 'error');
        }
      });
  }
}

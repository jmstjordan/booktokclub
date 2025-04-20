import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookBoostService } from '../../../../services/bookboost.service';
import { AdAvailability, AdUpload, ProductUpload } from '../../../../interfaces';
import { StripeService } from 'ngx-stripe';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-adform',
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule
  ],
  templateUrl: './adform.component.html',
  styleUrl: './adform.component.scss'
})
export class AdformComponent implements AfterViewInit {

  @Output() adCreate = new EventEmitter<any>();
  @Input() adPrices!: {};
  @Input() productSources!: string[];
  @Input() productPrices!: number[];
  @ViewChild('flatpickrInput') input!: ElementRef;
  adForm!: FormGroup;
  checkTitle!: string;

  selectedDate: Date | null = null;
  private flatpickrInstance!: flatpickr.Instance;
  genreSelected = false;

  errorMessage!: string;

  constructor(private fb: FormBuilder, private bookBoostService: BookBoostService, public stripe: StripeService) {}

  ngOnInit(): void {
    this.adForm = this.fb.group({
      asin: ['', Validators.required],
      adDate: ['', Validators.required],
      genre: ['', Validators.required],
      productSource: ['', Validators.required],
      productPrice: ['', Validators.required]
    });
  }


  ngAfterViewInit() {
    const DAYS_OUT = 90;
    const today = new Date().getDate();
    const ninetyDaysFromNow = new Date();
    ninetyDaysFromNow.setDate(today + DAYS_OUT);

    this.flatpickrInstance = flatpickr(this.input.nativeElement, {
      disable: this.getNextNDays(DAYS_OUT + 1),
      dateFormat: 'Y-m-d',
      maxDate: ninetyDaysFromNow,
      minDate: "today"
    });
  }

  getNextNDays(n: number): Date[] {
    const days: Date[] = [];
    const today = new Date();
  
    for (let i = 0; i < n; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  }

  checkProductId(){
    if(this.adForm.value["asin"] !== "" && this.adForm.value["productSource"] !== ""){
      let upload = {
        productId: this.adForm.value["asin"],
        productSource: this.adForm.value["productSource"]
      } as ProductUpload;
      this.bookBoostService.getProduct(upload).subscribe((data) => {
        console.log(data);
        this.checkTitle = data.title;
      });
    }
  }
  
  getGenreAvailability(event: Event){
    const selectElement = event.target as HTMLSelectElement;
    let genre = selectElement.value;
    this.bookBoostService.getAdAvailability(genre).subscribe((data: AdAvailability[]) => {
      let disabledDates: Date[] = [];
      console.log(data)
      data.forEach((x) => {
        if(x.count == 0){
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
    const formData = this.adForm.value;

    // Access individual values
    const { asin, adDate, genre, productSource, productPrice } = formData;
    let adUpload = {
      adDate: adDate,
      productUpload: {
        productId: asin,
        productSource: productSource
      } as ProductUpload,
      genre: genre,
      productPrice: productPrice
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
}

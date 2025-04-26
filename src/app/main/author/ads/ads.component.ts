import { Component, OnInit } from '@angular/core';
import { BookBoostService } from '../../../../services/bookboost.service';
import { Ad, AdState, AdWithProduct, Product } from '../../../../interfaces';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-ads',
  imports: [CommonModule],
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.scss'
})
export class AdsComponent implements OnInit {

  adProducts!: AdWithProduct[];
  isLoading = false;
  cancelingAdId!: string;

  constructor(private bookboostService: BookBoostService, private toastService: ToastService){}

  ngOnInit(): void {
    this.bookboostService.getAds().subscribe((ads) => {
      this.bookboostService.getProductsByUser().subscribe((products) => {
        this.adProducts = this.combineAdsAndProducts(ads, products);
      });
    });
  }

  // Additional methods and properties can be added here
  cancelAd(adId: string){
    this.isLoading = true;
    this.cancelingAdId = adId;
    this.bookboostService.cancelAd(adId).subscribe(
      {
        next: () => {
          this.toastService.show('Ad Canceled!', 'success');
          this.isLoading = false;
          this.adProducts.forEach(ad => {
            if (ad.id == adId) {
              ad.state = 'Canceled';
            }
          });        
        },
        error: () => {
          this.toastService.show('Unable to cancel!', 'error');
          this.isLoading = false;
        }
      }
    );
  }

  combineAdsAndProducts(ads: Ad[], products: Product[]): AdWithProduct[] {
    const productMap = new Map<string, Product>();
  
    // Map products by id
    for (const product of products) {
      productMap.set(product.id, product);
    }
  
    // Map ads to AdWithProduct
    const combinedList: AdWithProduct[] = ads
      .map(ad => {
        const matchingProduct = productMap.get(ad.productId);
        if (!matchingProduct) {
          console.warn(`No matching product found for ad with productId ${ad.productId}`);
          return null; // skip unmatched ads
        }
  
        // Create a new object without productId and add the product
        const { productId, ...adWithoutProductId } = ad;
  
        return {
          ...adWithoutProductId,
          product: matchingProduct
        };
      })
      .filter((item): item is AdWithProduct => item !== null);
  
    return combinedList;
  }
}



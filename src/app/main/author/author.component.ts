import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdformComponent } from './adform/adform.component';
import { BookBoostService } from '../../../services/bookboost.service';
import { Ad, AdState } from '../../../interfaces';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-author',
  imports: [CommonModule, AdformComponent],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss'
})
export class AuthorComponent implements OnInit{

  ads!: Ad[];
  adPrices = {};
  productSources!: string[];
  productPrices!: number[];
  
  constructor(private bookboostService: BookBoostService, private authService: AuthService){}

  ngOnInit(): void {
    console.log(this.authService.getUserRoles());
    this.bookboostService.getAds().subscribe((data) => {
      this.ads = data;
      console.log(this.ads);
    });
    this.bookboostService.getPrices().subscribe((adPrices) => this.adPrices = adPrices);
    this.bookboostService.getProductSources().subscribe((productSources) => this.productSources = productSources);
    this.bookboostService.getProductPrices().subscribe((prices) => this.productPrices = prices);
  }

  cancelAd(adId: string){
    this.bookboostService.cancelAd(adId).subscribe(res =>{
      this.ads.forEach(ad =>{
        if(ad.id == adId){
          ad.state = AdState.Canceled;
        }
      });
    });
  }

  receiveCreateAd(ad: any){
    console.log(ad);
    this.ads.push(ad);
  }
}

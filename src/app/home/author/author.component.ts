import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AdformComponent } from './adform/adform.component';
import { BookBoostService } from '../../../services/bookboost.service';
import { Ad } from '../../../interfaces';
import { ActivatedRoute } from '@angular/router';
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
  userId!: string;
  
  constructor(private bookboostService: BookBoostService, private route: ActivatedRoute, private authService: AuthService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params=> {
      this.userId = params.get("id") as string;
    });
    this.bookboostService.getAds().subscribe((data) => {
      this.ads = data;
      console.log(this.ads);
    });
    this.bookboostService.getPrices().subscribe((adPrices) => this.adPrices = adPrices);
    this.bookboostService.getProductSources().subscribe((productSources) => this.productSources = productSources);
  }

  receiveCreateAd(ad: any){
    console.log(ad);
    this.ads.push(ad);
  }
}

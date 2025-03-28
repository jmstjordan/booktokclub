import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdformComponent } from './adform/adform.component';
import { BookBoostService } from '../../../services/bookboost.service';
import { PricesComponent } from './prices/prices.component';
import { Ad } from '../../../interfaces';

@Component({
  selector: 'app-author',
  imports: [CommonModule, AdformComponent, PricesComponent],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss'
})
export class AuthorComponent implements OnInit{

  ads!: Ad[];

  constructor(private bookboostService: BookBoostService){}

  ngOnInit(): void {
    this.bookboostService.getAds().subscribe((data) => {
      this.ads = data;
      console.log(this.ads);
    });
  }

  receiveCreateAd(ad: any){
    console.log(ad);
    this.ads.push(ad);
  }
}

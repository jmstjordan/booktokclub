import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookBoostService } from '../../../../services/bookboost.service';
import { Product } from '../../../../interfaces';

@Component({
  selector: 'app-reader-splash',
  imports: [CommonModule],
  templateUrl: './reader-splash.component.html',
  styleUrl: './reader-splash.component.scss'
})
export class ReaderSplashComponent implements OnInit{

  // TODO: fill this in with default stubs
  products: Product[] = [];
  productClasses = [
    "absolute top-0 left-0 rounded shadow-md transform rotate-3 hover:scale-105 transition-transform duration-200 z-10",
    "absolute top-8 left-24 rounded shadow-md transform -rotate-6 hover:scale-105 transition-transform duration-200 z-20",
    "absolute top-16 right-0 rounded shadow-md transform rotate-12 hover:scale-105 transition-transform duration-200 z-30",
    "absolute bottom-8 left-8 rounded shadow-md transform rotate-8 hover:scale-105 transition-transform duration-200 z-40",
    "absolute bottom-0 right-16 rounded shadow-md transform -rotate-3 hover:scale-105 transition-transform duration-200 z-50",
  ];
  carouselProducts: Product[] = [];
  constructor(private router: Router, private bookboost: BookBoostService){}

  ngOnInit(){
    this.bookboost.getProducts().subscribe(result => {
      console.log(result);
      this.products = result.slice(0, 6);
      this.carouselProducts = result.slice(6, result.length);
    });
  }

  getProductClass(index: number){
    return this.productClasses[index];
  }
  routeSignup(){
    this.router.navigate(['signup', 'reader']);
  }
}

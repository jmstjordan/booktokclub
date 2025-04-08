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
  carouselProducts: Product[] = [];

  constructor(private router: Router, private bookboost: BookBoostService){}

  ngOnInit(){
    this.bookboost.getProducts().subscribe(result => {
      console.log(result);
      this.products = result.slice(0, 6);
      this.carouselProducts = result.slice(6, result.length);
    });
  }

  routeSignup(){
    this.router.navigate(['signup', 'reader']);
  }
}

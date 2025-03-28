import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookBoostService } from '../../../services/bookboost.service';
import { Product } from '../../../interfaces';

@Component({
  selector: 'app-reader',
  imports: [CommonModule],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.scss'
})
export class ReaderComponent {

  products!: Product[];

  constructor(private bookboostService: BookBoostService){}

  OnInit(){
    this.bookboostService.getProducts().subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }
}

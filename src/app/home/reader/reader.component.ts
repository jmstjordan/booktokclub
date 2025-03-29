import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookBoostService } from '../../../services/bookboost.service';
import { Product } from '../../../interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reader',
  imports: [CommonModule],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.scss'
})
export class ReaderComponent implements OnInit{

  products!: Product[];
  userId!: string;

  constructor(private bookboostService: BookBoostService, private route: ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe(async params=> {
      this.userId = params.get("id") as string;
    });
    // this.bookboostService.getProducts().subscribe((data) => {
    //   console.log(data);
    //   this.products = data;
    // });
  }
}

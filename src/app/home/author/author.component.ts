import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdformComponent } from './adform/adform.component';
import { BookBoostService } from '../../../services/bookboost.service';

@Component({
  selector: 'app-author',
  imports: [CommonModule, AdformComponent],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss'
})
export class AuthorComponent implements OnInit{

  ads!: any;

  constructor(private bookboostService: BookBoostService){}

  ngOnInit(): void {
      this.bookboostService.getAds().subscribe((data) =>
      {
        console.log(data);
        this.ads = data;
      },
      (error) => {console.error(error)}
      )
  }
}

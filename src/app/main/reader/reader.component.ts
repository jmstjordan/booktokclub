import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookBoostService } from '../../../services/bookboost.service';
import { Product, User } from '../../../interfaces';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reader',
  imports: [CommonModule, FormsModule],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.scss'
})
export class ReaderComponent implements OnInit{

  products!: Product[];
  user!: User;
  genres: string[] = [];
  selectedGenres: string[] = [];
  selectedGenresMap: Record<string, boolean> = {};

  constructor(private bookboostService: BookBoostService, private route: ActivatedRoute){}

  ngOnInit(){
    // this.syncSelectedGenres(user);
    this.bookboostService.getGenres().subscribe((data) => {
      console.log(data);
      this.genres = data;
    });
  }

  syncSelectedGenres(user: User){
    if(user.readerConfig.genres !== null){
      user.readerConfig.genres.forEach((genre) => {
        this.selectedGenresMap[genre] = true;        
      });
    }
  }

  saveUser(){
    this.user.readerConfig.genres = this.selectedGenres;

    //snack bar here
    this.bookboostService.upsertUser(this.user).subscribe( res => console.log("Saved!"));
  }

  ngDoCheck() {
    this.selectedGenres = this.genres.filter(genre => this.selectedGenresMap[genre]);
  }
}

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
  genres: string[] = [];
  selectedGenres: string[] = [];
  selectedGenresMap: Record<string, boolean> = {};

  constructor(private bookboostService: BookBoostService, private route: ActivatedRoute){}

  ngOnInit(){
    this.bookboostService.getUser().subscribe((user) => {
      console.log(user)
      this.syncSelectedGenres(user);
    });
    this.bookboostService.getGenres().subscribe((data) => {
      console.log(data);
      this.genres = data;
    });
  }

  syncSelectedGenres(user: User){
    if(user.preferences !== null && user.preferences.genres !== null){
      user.preferences.genres.forEach((genre) => {
        this.selectedGenresMap[genre] = true;        
      });
    }
  }

  savePreferences(){
    //snack bar here
    this.bookboostService.updatePreferences(this.selectedGenres).subscribe(res => console.log(res));
  }

  ngDoCheck() {
    this.selectedGenres = this.genres.filter(genre => this.selectedGenresMap[genre]);
  }
}

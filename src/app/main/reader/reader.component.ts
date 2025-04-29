import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookBoostService } from '../../../services/bookboost.service';
import { Product, User } from '../../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from '../../../services/auth.service';

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
  isLoading = false;

  constructor(private bookboostService: BookBoostService, private toastService: ToastService, private authService: AuthService, private router: Router){}

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
    this.isLoading = true;
    this.bookboostService.updatePreferences(this.selectedGenres)
      .subscribe({next: () => {
        this.isLoading = false;
        this.toastService.show('Preferences saved!', 'success');
      }, error: () => {
        this.isLoading = false;
        this.toastService.show('Unable to save!', 'error');
      }}
    );
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngDoCheck() {
    this.selectedGenres = this.genres.filter(genre => this.selectedGenresMap[genre]);
  }
}

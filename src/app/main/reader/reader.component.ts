import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookBoostService } from '../../../services/bookboost.service';
import { Product, Subscriber } from '../../../interfaces';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from '../../../services/auth.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-reader',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.scss'
})
export class ReaderComponent implements OnInit{

  products!: Product[];
  genres: string[] = [];
  selectedGenres: string[] = [];
  selectedGenresMap: Record<string, boolean> = {};
  isLoading = false;
  subscribed!: boolean;

  constructor(private bookboostService: BookBoostService, private toastService: ToastService, private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.bookboostService.getSubscriber().subscribe((sub) => {
      this.subscribed = sub.isSubscribed;
      this.syncSelectedGenres(sub);
    });
    this.bookboostService.getGenres().subscribe((data) => {
      this.genres = data;
    });
    this.bookboostService.getProducts().subscribe((data) => {
      console.log(data)
      this.products = data.slice(0, 24);
    });
  }

  syncSelectedGenres(subscriber: Subscriber){
    if(subscriber.preferences !== null && subscriber.preferences.genres !== null){
      subscriber.preferences.genres.forEach((genre) => {
        this.selectedGenresMap[genre] = true;        
      });
    }
  }

  savePreferences(){
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

  subscribe(){
    this.isLoading = true;
    this.bookboostService.updateSubscriptionStatus(!this.subscribed)
    .subscribe({next: () => {
      this.isLoading = false;
      this.subscribed = !this.subscribed;
      this.toastService.show('Updated!', 'success');
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

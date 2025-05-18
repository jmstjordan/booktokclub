import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookBoostService } from '../../../services/bookboost.service';
import { Product, Subscriber, SubscriberPatch } from '../../../interfaces';
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
  subscriber!: Subscriber;

  constructor(private bookboostService: BookBoostService, private toastService: ToastService, private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.bookboostService.getSubscriber().subscribe((sub) => {
      this.subscriber = sub;
      this.syncSelectedGenres(sub);
    });
    this.bookboostService.getGenres().subscribe((data) => {
      this.genres = data;
    });
    this.bookboostService.getProducts().subscribe((data) => {
      this.products = data.slice(0, 24);
    });
  }

  syncSelectedGenres(subscriber: Subscriber){
    if(subscriber.topics !== null && subscriber.topics !== null){
      subscriber.topics.forEach((topic) => {
        this.selectedGenresMap[topic] = true;        
      });
    }
  }

  saveTopics(){
    this.isLoading = true;
    this.bookboostService.updateSubscriber({topics: this.selectedGenres, isSubscribed: this.subscriber.isSubscribed} as SubscriberPatch)
      .subscribe({next: (sub) => {
        this.subscriber = sub; 
        this.isLoading = false;
        this.toastService.show('Genres saved!', 'success');
      }, error: () => {
        this.isLoading = false;
        this.toastService.show('Unable to save!', 'error');
      }}
    );
  }

  subscribe(){
    this.isLoading = true;
    this.bookboostService.updateSubscriber({isSubscribed: !this.subscriber.isSubscribed, topics: this.selectedGenres} as SubscriberPatch)
      .subscribe({next: (sub) => {
        this.subscriber = sub; 
        this.isLoading = false;
        this.toastService.show('Saved!', 'success');
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

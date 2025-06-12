import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookBoostService } from '../../../services/bookboost.service';
import { Genre, Product, Subscriber, SubscriberPatch } from '../../../interfaces';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from '../../../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reader',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.scss'
})
export class ReaderComponent implements OnInit{

  genreProductMap: Record<string, Product[]> = {};
  trendingMap: Record<string, Product[]> = {};
  products!: Product[][];
  genres: string[] = [];
  selectedGenres: string[] = [];
  selectedGenresMap: Record<string, boolean> = {};
  isLoading = false;
  subscriber!: Subscriber;
  affiliateId: string = environment.affiliateId;

  constructor(private bookboostService: BookBoostService, private toastService: ToastService, private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.bookboostService.getSubscriber().subscribe((sub) => {
      this.subscriber = sub;
      this.syncSelectedGenres(sub);
    });
    this.bookboostService.getDistributionTopics().subscribe((data) => {
      this.genres = data;
    });
    this.bookboostService.getProducts().subscribe((data) => {
        data.forEach(d => {
          const firstGenre = d.genres?.[0];
          if (firstGenre) {
            if(firstGenre in this.genreProductMap){
              this.genreProductMap[firstGenre]?.push(d);
            }else{
              this.genreProductMap[firstGenre] = [d];
            }
          }          
      });
      Object.keys(this.genreProductMap).forEach((genreKey) => {
        const products = this.genreProductMap[genreKey as unknown as Genre];
        if (products && products.length > 6) {
          this.genreProductMap[genreKey as unknown as Genre] = products.slice(0, 6);
        }
      });
      data.sort((a, b) => b.rating - a.rating);
      this.trendingMap["Trending"] = data.slice(0, 6);
      console.log(this.trendingMap)
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

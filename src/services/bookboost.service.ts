import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ad, AdAvailability, Genre, Product, ProductUpload, User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class BookBoostService {

  apiUrl = "https://localhost:7042"
  constructor(private http: HttpClient) {}

  getAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(`${this.apiUrl}/api/Ad`);
  }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/api/User/${username}`);
  }

  upsertUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(`${this.apiUrl}/api/User`, user, { headers });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/api/Product`);
  }

  getPrices(): Observable<{}> {
    return this.http.get<{}>(`${this.apiUrl}/api/Payment/Prices`);
  }

  getProduct(productUpload: ProductUpload): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Product>(`${this.apiUrl}/api/Product`, productUpload, { headers });
  }

  createCheckoutSession(metadata: {}){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/api/Payment/CreateAdCheckoutSession`, metadata, { headers });
  }

  verifyAdPurchase(sessionId: string): Observable<Ad> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Ad>(`${this.apiUrl}/api/Payment/VerifySession/${sessionId}`, { headers });
  }

  getAdAvailability(genre: string): Observable<AdAvailability[]>{
    return this.http.get<AdAvailability[]>(`${this.apiUrl}/api/Ad/Availability/${genre}`);
  }

  getGenres(): Observable<string[]>{
    return this.http.get<string[]>(`${this.apiUrl}/api/Ad/Genres`);
  }

  getProductSources(): Observable<string[]>{
    return this.http.get<string[]>(`${this.apiUrl}/api/Product/Sources`);
  }
}

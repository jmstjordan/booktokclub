import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ad, AdAvailability, Product, ProductUpload, User } from '../interfaces';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookBoostService {

  apiUrl = environment.bookboostApi;
  constructor(private http: HttpClient) {}

  getAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(`${this.apiUrl}/api/Ad`);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/api/User/Me`);
  }

  updatePreferences(genres: string[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<{}>(`${this.apiUrl}/api/User/Preferences`, {genres: genres}, { headers });
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

  forgotPassword(email: string): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/api/Auth/ForgotPassword`, { email: email }, { headers });
  }

  resetPassword(email: string, newPassword: string, token: string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/api/Auth/ResetPassword`, { email: email, newPassword: newPassword, token: token }, { headers });
  }
}

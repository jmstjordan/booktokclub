import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ad, AdAvailability, Product, ProductValidate, Subscriber, SubscriberPatch, SubscriberSource, SubscriberUpload, User } from '../interfaces';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookBoostService {

  apiUrl = environment.bookboostApi;
  constructor(private http: HttpClient) {}

  getAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(`${this.apiUrl}/Ad`);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/User/Me`);
  }

  getSubscriber(): Observable<Subscriber> {
    return this.http.get<Subscriber>(`${this.apiUrl}/Distribution/Subscriber`);
  }

  addSubscriber(email: string): Observable<any> {
    let subscriber = {
      email: email,
      subscriberSource: SubscriberSource.BookTokClub
    } as SubscriberUpload;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/Distribution/Subscriber`, subscriber, { headers });
  }

  updateSubscriber(subscriber: SubscriberPatch): Observable<Subscriber> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch<Subscriber>(`${this.apiUrl}/Distribution/Subscriber`, subscriber, { headers });
  }

  getProducts(): Observable<Product[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Product[]>(`${this.apiUrl}/Product`, { headers });
  }

  getProductsByUser(): Observable<Product[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Product[]>(`${this.apiUrl}/Product/Me`, { headers });
  }

  getPrices(): Observable<{}> {
    return this.http.get<{}>(`${this.apiUrl}/Ad/Prices`);
  }

  validateProduct(product: ProductValidate): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Product>(`${this.apiUrl}/Product/Validate`, product, { headers });
  }

  createCheckoutSession(metadata: {}){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/Payment/CreateAdCheckoutSession`, metadata, { headers });
  }

  verifyAdPurchase(sessionId: string): Observable<Ad> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Ad>(`${this.apiUrl}/Payment/VerifySession/${sessionId}`, { headers });
  }

  getAdAvailability(genre: string): Observable<AdAvailability[]>{
    return this.http.get<AdAvailability[]>(`${this.apiUrl}/Ad/Availability/${genre}`);
  }

  getGenres(): Observable<string[]>{
    return this.http.get<string[]>(`${this.apiUrl}/Ad/Genres`);
  }

  getDistributionTopics(): Observable<string[]>{
    return this.http.get<string[]>(`${this.apiUrl}/Distribution/Topics`);
  }

  getProductSources(): Observable<string[]>{
    return this.http.get<string[]>(`${this.apiUrl}/Product/Sources`);
  }

  getProductPrices(): Observable<number[]>{
    return this.http.get<number[]>(`${this.apiUrl}/Product/Prices`);
  }

  forgotPassword(email: string): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/Auth/ForgotPassword`, { email: email }, { headers });
  }

  resetPassword(email: string, newPassword: string, token: string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/Auth/ResetPassword`, { email: email, newPassword: newPassword, token: token }, { headers });
  }

  cancelAd(adId: string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/Ad/${adId}/Cancel`, {}, { headers });
  }
}

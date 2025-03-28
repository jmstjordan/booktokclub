import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ad, AdAvailability, AdUpload, Genre, ProductUpload } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class BookBoostService {

  apiUrl = "https://localhost:7042"
  constructor(private http: HttpClient) {}

  getAds(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Ad`);
  }

  getProduct(productUpload: ProductUpload): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Ad>(`${this.apiUrl}/api/Product`, productUpload, { headers });
  }

  createCheckoutSession(metadata: {}){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/api/Ad/create-checkout-session`, metadata, { headers });
  }

  verifySession(sessionId: string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}/api/Ad/verify-session/${sessionId}`, { headers });
  }

  createAd(adUpload: AdUpload){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/api/Ad`, adUpload, { headers });
  }

  getAdAvailability(genre: string): Observable<AdAvailability[]>{
    return this.http.get<AdAvailability[]>(`${this.apiUrl}/api/Ad/Availability/${genre}`);
  }

}

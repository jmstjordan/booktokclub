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
    return this.http.get<any[]>(`${this.apiUrl}/Ad`);
  }

  getProduct(productUpload: ProductUpload): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Ad>(`${this.apiUrl}/Product`, productUpload, { headers });
  }

  createAd(adUpload: AdUpload){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/Ad`, adUpload, { headers });
  }

  getAdAvailability(genre: string): Observable<AdAvailability[]>{
    return this.http.get<AdAvailability[]>(`${this.apiUrl}/Ad/Availability/${genre}`);
  }

}

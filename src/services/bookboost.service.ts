import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookBoostService {

  apiUrl = "https://localhost:7042"
  constructor(private http: HttpClient) {}

  getAds(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Ad`);
  }

}

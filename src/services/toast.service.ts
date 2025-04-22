import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';

export interface ToastData {
  message: string;
  type?: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastData | null>(null);
  toast$ = this.toastSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' = 'success', duration = 3000) {
    this.toastSubject.next({ message, type });

    // auto-dismiss after duration
    timer(duration).subscribe(() => {
      this.toastSubject.next(null);
    });
  }
}

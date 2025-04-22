import { Component } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  imports: [CommonModule]
})
export class ToastComponent {
  toast$!: Observable<any | null>;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toast$ = this.toastService.toast$;
  }
}
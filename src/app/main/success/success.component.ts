import { Component, OnInit } from '@angular/core';
import { BookBoostService } from '../../../services/bookboost.service';
import { Ad } from '../../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-success',
  imports: [CommonModule],
  templateUrl: './success.component.html',
})
export class SuccessComponent implements OnInit {
  ad!: Ad;

  constructor(private bookBoostService: BookBoostService, private router: Router, private toastService: ToastService) {}

  ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    if (sessionId) {
      this.bookBoostService.verifyAdPurchase(sessionId).subscribe((response) => {
        if(response){
          this.ad = response;
          this.toastService.show('Ad Created!', 'success');
        }else{
          this.toastService.show('Error creating Ad!', 'error');
        }
        // response.
        // if (response[""] === 'succeeded') {
        //   this.paymentStatus = 'Payment was successful!';
        // } else {
        //   this.paymentStatus = 'Payment failed or was canceled.';
        // }
      });
    }
  }
  authorPortal(){
    this.router.navigate([`author/home/ads`]);
  }
}

import { Component, OnInit } from '@angular/core';
import { BookBoostService } from '../../../services/bookboost.service';
import { Ad } from '../../../interfaces';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success',
  imports: [CommonModule],
  templateUrl: './success.component.html',
})
export class SuccessComponent implements OnInit {
  ad!: Ad;

  constructor(private bookBoostService: BookBoostService, private router: Router) {}

  ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    if (sessionId) {
      this.bookBoostService.verifyAdPurchase(sessionId).subscribe((response) => {
        if(response){
          console.log(response);
          this.ad = response;
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
    this.router.navigate([`home/author`]);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookBoostService } from '../../../services/bookboost.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
})
export class SuccessComponent implements OnInit {
  paymentStatus: string = '';

  constructor(private bookBoostService: BookBoostService) {}

  ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    if (sessionId) {
      this.bookBoostService.verifySession(sessionId).subscribe((response) => {
        console.log(response);
        // response.
        // if (response[""] === 'succeeded') {
        //   this.paymentStatus = 'Payment was successful!';
        // } else {
        //   this.paymentStatus = 'Payment failed or was canceled.';
        // }
      });
    } else {
      this.paymentStatus = 'No session ID found.';
    }
  }
}

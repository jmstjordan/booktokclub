import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-button',
  imports: [CommonModule],
  templateUrl: './sign-up-button.component.html',
  styleUrl: './sign-up-button.component.scss'
})
export class SignUpButtonComponent {

  constructor(private router: Router){}

  routeSignup(){
    this.router.navigate(["/signup/reader"]);
  }
}

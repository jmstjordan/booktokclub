import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { SocialLoginComponent } from '../../social-login/social-login.component';

@Component({
  selector: 'app-author-splash',
  imports: [CommonModule, HeaderComponent, SocialLoginComponent],
  templateUrl: './author-splash.component.html',
  styleUrl: './author-splash.component.scss'
})
export class AuthorSplashComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit(){

  }

  routeSignup(){
    this.router.navigate(['signup', 'author']);
  }
}

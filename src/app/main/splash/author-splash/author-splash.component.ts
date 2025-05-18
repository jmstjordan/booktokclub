import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-author-splash',
  imports: [CommonModule, HeaderComponent],
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

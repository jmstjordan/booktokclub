import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-splash',
  imports: [CommonModule],
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

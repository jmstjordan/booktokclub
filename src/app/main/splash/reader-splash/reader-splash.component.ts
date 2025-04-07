import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reader-splash',
  imports: [CommonModule],
  templateUrl: './reader-splash.component.html',
  styleUrl: './reader-splash.component.scss'
})
export class ReaderSplashComponent implements OnInit{

  constructor(private router: Router){}

  ngOnInit(){
  }

  routeSignup(){
    this.router.navigate(['signup', 'reader']);
  }
}

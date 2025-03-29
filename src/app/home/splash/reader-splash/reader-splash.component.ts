import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../login/login.component';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reader-splash',
  imports: [CommonModule, LoginComponent],
  templateUrl: './reader-splash.component.html',
  styleUrl: './reader-splash.component.scss'
})
export class ReaderSplashComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.authService.getUser().subscribe((retUser) => {
      console.log(retUser);
      if(retUser.clientPrincipal !== null){
        this.router.navigate([`reader/${retUser.clientPrincipal.userId}`]);
      }
    });
  }
}

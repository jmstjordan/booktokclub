import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../login/login.component';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-splash',
  imports: [CommonModule, LoginComponent],
  templateUrl: './author-splash.component.html',
  styleUrl: './author-splash.component.scss'
})
export class AuthorSplashComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.authService.getUser().subscribe((retUser) => {
      console.log(retUser);
      if(retUser.clientPrincipal !== null){
        this.router.navigate([`author/${retUser.clientPrincipal.userId}`]);
      }
    });
  }
}

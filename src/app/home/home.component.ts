import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BookBoostService } from '../../services/bookboost.service';
import { User } from '../../interfaces';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterOutlet, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  user: any;
  userData!: User;

  constructor(private router: Router, private authService: AuthService, private bookboostService: BookBoostService){

  }

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      console.log(user);
      if(user.clientPrincipal !== null){
        this.user = user;
        this.bookboostService.getUser(this.user.clientPrincipal.userId).subscribe(
          (user) => {
            console.log(user);
            this.userData = user;
            // this.router.navigate([`/reader/${this.user.clientPrincipal.userId}`]);
          },
          (error) => {
            if(error.status == 404){
              let newUser = {
                userId: this.user.clientPrincipal.userId,
                username: this.user.clientPrincipal.userDetails
              } as User;
              this.bookboostService.upsertUser(newUser).subscribe(data => console.log(data));
              // this.router.navigate([`/reader/${this.user.clientPrincipal.userId}`]);

            }
          }
        );
      }else{
        this.user = null;
      }
    });
  }

  login(provider: string, role: string): void {
    this.authService.login(provider, role);
  }

  reader(){
    this.router.navigate([`/reader/${this.user.clientPrincipal.userId}`]);
  }

  author(){
    this.router.navigate([`/author/${this.user.clientPrincipal.userId}`]);
  }

  logout(): void {
    this.authService.logout();
  }
}

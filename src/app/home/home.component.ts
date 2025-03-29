import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BookBoostService } from '../../services/bookboost.service';
import { User } from '../../interfaces';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  user: any;
  userData!: User;
  genres!: string[];

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private bookboostService: BookBoostService){

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
          },
          (error) => {
            if(error.status == 404){
              let newUser = {
                userId: this.user.clientPrincipal.userId,
                username: this.user.clientPrincipal.userDetails
              } as User;
              this.bookboostService.upsertUser(newUser).subscribe(data => console.log(data));
            }
          }
        );
      }else{
        this.user = null;
        this.router.navigate(['/login']);
      }
    });
  }

  reader(){
    this.router.navigate(['/reader']);
  }

  author(){
    this.router.navigate(['/author']);
  }

  logout(): void {
    this.authService.logout();
  }
}

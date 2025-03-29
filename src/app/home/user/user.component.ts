import { Component, Input, OnInit } from '@angular/core';
import { BookBoostService } from '../../../services/bookboost.service';
import { User } from '../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  @Input() user!: any;
  userAccount!: User;

  constructor(private bookboostService: BookBoostService){

  }

  ngOnInit() {
    this.bookboostService.getUser(this.user.clientPrincipal.userId).subscribe(
      (user) => {
      console.log(user);
      this.userAccount = user;
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
  }

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthorComponent } from './author/author.component';
import { SuccessComponent } from './success/success.component';
import { ReaderComponent } from './reader/reader.component';
import { BookBoostService } from '../../services/bookboost.service';
import { User } from '../../interfaces';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, AuthorComponent, SuccessComponent, ReaderComponent, UserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  user: any;
  userData!: User;
  basePath!: string;
  otherPath!: string;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private bookboostService: BookBoostService){
    this.route.url.subscribe(segments => {
      const path = segments.map(segment => segment.path);
      this.basePath = path[1];
      this.checkOtherPath(path[1]);
    });  
  }

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      console.log(user);
      if(user.clientPrincipal !== null){
        this.user = user;
      }else{
        this.user = null;
        this.router.navigate(['/login']);
      }
    });
  }

  checkOtherPath(path: string){
    if(path == 'author'){
      this.otherPath = 'reader';
    }else if (path == 'reader'){
      this.otherPath = 'author';
    }else if(path == 'success'){
      this.otherPath = 'author';
    }
  }

  swapPortal(){
    this.router.navigate([`home/${this.otherPath}`]);
  }

  logout(): void {
    this.authService.logout();
  }
}

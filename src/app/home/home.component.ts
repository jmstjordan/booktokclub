import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BookBoostService } from '../../services/bookboost.service';
import { AuthorComponent } from './author/author.component';
import { ReaderComponent } from './reader/reader.component';
import { SuccessComponent } from './success/success.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, AuthorComponent, ReaderComponent, SuccessComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  user: any;
  basePath!: string;
  otherPath!: string;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService){
    this.route.url.subscribe(segments => {
      const path = segments.map(segment => segment.path);
      this.basePath = path[1];
      this.checkOtherPath(path[1]);
    });  
  }

  ngOnInit(): void {
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

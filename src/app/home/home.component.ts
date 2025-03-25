import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BookBoostService } from '../../services/bookboost.service';
import { AuthorComponent } from './author/author.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, AuthorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  user: any;
  basePath: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private bookService: BookBoostService){
    this.route.url.subscribe(segments => {
      const path = segments.map(segment => segment.path);
      this.basePath = path[0];
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

  logout(): void {
    this.authService.logout();
  }
}

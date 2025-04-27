import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { filter } from 'rxjs';
import { BookBoostService } from '../../../services/bookboost.service';
import { User } from '../../../interfaces';

@Component({
  selector: 'app-author',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss'
})
export class AuthorComponent implements OnInit{

  // notSelected = "block p-2 hover:bg-[#7163B6] rounded text-[#140900] hover:text-[#FFFFFF] leading-relaxed";
  // selected = "block p-2 bg-[#7163B6] rounded text-[#FFFFFF] leading-relaxed";
  navItems = [
    "Create Ad",
    "Ad Management",
    "Log Out"
  ]
  authorPath!: string;
  user!: User;

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute, private bookboostService: BookBoostService){}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const child = this.route.firstChild;
        if (child?.snapshot?.routeConfig?.path) {
          this.authorPath = child.snapshot.routeConfig.path;
        }
      });
      this.bookboostService.getUser().subscribe((user) => {
        this.user = user;
        if(user.profilePicture == null){
          this.user.profilePicture = 'https://ui-avatars.com/api/?name=' + this.user.username + '&background=AD8466&color=140900&size=40';
        }
      });
  }

  navigate(path: string){
    if(path == "Create Ad"){
      this.router.navigate(['author', 'home', 'create-ad']);
    }else if(path == "Ad Management"){
      this.router.navigate(['author', 'home', 'ads']);
    }else if(path == "Log Out"){
      this.authService.logout();
      this.router.navigate(['/']);
    }
  }
}

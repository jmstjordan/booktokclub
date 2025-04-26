import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-author',
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit{

  // notSelected = "block p-2 hover:bg-[#7163B6] rounded text-[#140900] hover:text-[#FFFFFF] leading-relaxed";
  // selected = "block p-2 bg-[#7163B6] rounded text-[#FFFFFF] leading-relaxed";
  
  navItems = [
    "Create Ad",
    "My Ads",
    "Log Out"
  ]
  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(): void {

  }

  navigate(path: string){
    if(path == "Create Ad"){
      this.router.navigate(['author', 'home', 'create-ad']);
    }else if(path == "My Ads"){
      this.router.navigate(['author', 'home', 'ads']);
    }else if(path == "Log Out"){
      this.authService.logout();
      this.router.navigate(['/']);
    }
  }
}

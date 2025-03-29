import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  imports: [HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'booktokclub';
  user: any;

  constructor(private router: Router){

  }

  home(){
    this.router.navigate(['/']);
  }
}

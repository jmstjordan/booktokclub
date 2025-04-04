import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { MainComponent } from './main/main.component';

@Component({
  selector: 'app-root',
  imports: [MainComponent],
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

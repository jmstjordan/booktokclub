import { Component } from '@angular/core';
import { Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'booktokclub';
  user: any;

  constructor(private router: Router){

  }

  home(){
    this.router.navigate(['/home']);
  }
}

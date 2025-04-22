import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ToastComponent } from './toast/toast.component';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent{

}

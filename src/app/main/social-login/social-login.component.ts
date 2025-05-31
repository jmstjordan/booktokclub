import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../environments/environment';

declare const google: any;

@Component({
  selector: 'app-social-login',
  imports: [CommonModule],
  templateUrl: './social-login.component.html',
  styleUrl: './social-login.component.scss'
})
export class SocialLoginComponent {

  @Input() role!: string;
  @Input() templateId!: string;
  @Input() iconStyle!: string;

  constructor(private authService: AuthService){

   }


  ngAfterViewInit() {
    if (!(window as any).google) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => this.initializeGoogleSignIn(); // init after load
      document.body.appendChild(script);
    } else {
      this.initializeGoogleSignIn(); // script already available
    }
  }

  initializeGoogleSignIn(){
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: this.handleCredentialResponse.bind(this),
    });
    let icon = {};
    if(this.iconStyle != "full"){
      icon = {
        type: "icon",           // Makes it a circular icon button
        theme: "outline",
        size: "large",
        text: "icon",           // Required to render only the icon
        shape: "circle",
        logo_alignment: "center"     
      };
    }else{
      icon = {
         shape: 'rectangular',
         size: 'large',
         theme: 'outline',
         text: 'signin_with',
         logo_alignment: 'left'
      }
    }
    google.accounts.id.renderButton(
      document.getElementById(this.templateId),
        icon
    );
  }

  handleCredentialResponse(response: any) {
    const idToken = response.credential;
    this.authService.loginWithGoogle(idToken, this.role);
  }

}

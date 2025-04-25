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

  constructor(private authService: AuthService){ }


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

    google.accounts.id.renderButton(
      document.getElementById('googleSignInDiv'),
      { 
        theme: 'outline',   // or 'filled_blue', 'filled_black'
        size: 'large',      // 'small' | 'medium' | 'large'
        text: 'continue_with', // or 'signup_with', 'continue_with', 'signin'
        logo_alignment: 'left' // or 'left'
      }
    );
  }

  handleCredentialResponse(response: any) {
    const idToken = response.credential;
    console.log('Google ID Token:', idToken);
    this.authService.loginWithGoogle(idToken, this.role);
  }

}

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
        type: 'icon',        // 👈 this makes it icon-only
        shape: 'circle',     // 👈 optional, circle shape
        theme: 'outline', 
        size: 'large',
      }
    );
  }

  handleCredentialResponse(response: any) {
    const idToken = response.credential;
    this.authService.loginWithGoogle(idToken, this.role);
  }

}

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
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: this.handleCredentialResponse.bind(this),
    });

    google.accounts.id.renderButton(
      document.getElementById('googleSignInDiv'),
      { theme: 'outline', size: 'medium' }
    );
  }

  handleCredentialResponse(response: any) {
    const idToken = response.credential;
    console.log('Google ID Token:', idToken);
    this.authService.loginWithGoogle(idToken, this.role);
  }

}

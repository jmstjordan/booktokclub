import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-social-login',
  imports: [CommonModule],
  templateUrl: './social-login.component.html',
  styleUrl: './social-login.component.scss'
})
export class SocialLoginComponent {

  @Input() role!: string;
  @Input() buttonText!: string;

  startGoogleLogin() {
    const clientId = environment.googleClientId;
    const redirectUri = window.location.origin + '/google-callback'; // Set in Google Cloud Console
    const scope = 'openid email profile';
    const responseType = 'id_token';
    const nonce = Math.random().toString(36).substring(2); // Random string
    const state = this.role;

    const url = `https://accounts.google.com/o/oauth2/v2/auth` +
                `?client_id=${clientId}` +
                `&redirect_uri=${encodeURIComponent(redirectUri)}` +
                `&response_type=${responseType}` +
                `&scope=${encodeURIComponent(scope)}` +
                `&nonce=${nonce}` +
                `&state=${state}`;
    window.location.href = url;
  }
}

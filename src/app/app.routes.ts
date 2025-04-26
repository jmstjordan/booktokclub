import { Routes } from '@angular/router';
import { SuccessComponent } from './main/success/success.component';
import { AuthorComponent } from './main/author/author.component';
import { ReaderComponent } from './main/reader/reader.component';
import { AuthorSplashComponent } from './main/splash/author-splash/author-splash.component';
import { ReaderSplashComponent } from './main/splash/reader-splash/reader-splash.component';
import { SignupComponent } from './main/signup/signup.component';
import { AuthGuard } from '../services/auth.guard';
import { AuthRedirectGuard } from '../services/auth-redirect.guard';
import { LoginComponent } from './main/login/login.component';
import { ForgotPasswordComponent } from './main/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './main/reset-password/reset-password.component';
import { AdformComponent } from './main/author/adform/adform.component';
import { AdsComponent } from './main/author/ads/ads.component';

export const routes: Routes = [
    {path: '', component: ReaderSplashComponent, canActivate: [AuthRedirectGuard]},
    {path: 'author', component: AuthorSplashComponent, canActivate: [AuthRedirectGuard]},
    {path: 'reader', component: ReaderSplashComponent, canActivate: [AuthRedirectGuard]},
    {path: 'author/home', component: AuthorComponent, canActivate: [AuthGuard],
        children: [
        { path: 'create-ad', component: AdformComponent },
        { path: 'ads', component: AdsComponent },
        { path: '', redirectTo: 'create-ad', pathMatch: 'full' }
    ]
    },
    {path: 'reader/home', component: ReaderComponent, canActivate: [AuthGuard]},
    {path: 'success', component: SuccessComponent, canActivate: [AuthGuard]},
    {path: 'signup/:role', component: SignupComponent, canActivate: [AuthRedirectGuard]},
    {path: 'signup/:role/:email', component: SignupComponent, canActivate: [AuthRedirectGuard]},
    {path: 'login/:role', component: LoginComponent, canActivate: [AuthRedirectGuard]},
    {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AuthRedirectGuard]},
    {path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthRedirectGuard]},
    {path: '**', component: ReaderSplashComponent, canActivate: [AuthRedirectGuard]},
];

import { Routes } from '@angular/router';
import { SuccessComponent } from './main/success/success.component';
import { AuthorComponent } from './main/author/author.component';
import { ReaderComponent } from './main/reader/reader.component';
import { AuthorSplashComponent } from './main/splash/author-splash/author-splash.component';
import { ReaderSplashComponent } from './main/splash/reader-splash/reader-splash.component';
import { SignupComponent } from './main/signup/signup.component';
import { AuthGuard } from '../services/auth.guard';
import { AuthRedirectGuard } from '../services/auth-redirect.guard';

export const routes: Routes = [
    {path: '', component: ReaderSplashComponent, canActivate: [AuthRedirectGuard]},
    {path: 'author', component: AuthorSplashComponent, canActivate: [AuthRedirectGuard]},
    {path: 'reader', component: ReaderSplashComponent, canActivate: [AuthRedirectGuard]},
    {path: 'author/home', component: AuthorComponent, canActivate: [AuthGuard]},
    {path: 'reader/home', component: ReaderComponent, canActivate: [AuthGuard]},
    {path: 'success', component: SuccessComponent, canActivate: [AuthGuard]},
    {path: 'signup/:role', component: SignupComponent, canActivate: [AuthRedirectGuard]},
];

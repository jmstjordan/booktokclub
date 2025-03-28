import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home/success', component: HomeComponent},
    {path: 'home/author', component: HomeComponent},
    {path: 'home/reader', component: HomeComponent},
];

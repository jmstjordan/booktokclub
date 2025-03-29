import { Routes } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { SuccessComponent } from './home/success/success.component';
import { AuthorComponent } from './home/author/author.component';
import { ReaderComponent } from './home/reader/reader.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'success', component: SuccessComponent},
    {path: 'author', component: AuthorComponent},
    {path: 'reader', component: ReaderComponent},
];

import { Routes } from '@angular/router';
import { SuccessComponent } from './home/success/success.component';
import { AuthorComponent } from './home/author/author.component';
import { ReaderComponent } from './home/reader/reader.component';
import { AuthorSplashComponent } from './home/splash/author-splash/author-splash.component';
import { ReaderSplashComponent } from './home/splash/reader-splash/reader-splash.component';

export const routes: Routes = [
    {path: '', component: ReaderSplashComponent},
    {path: 'author', component: AuthorSplashComponent},
    {path: 'reader', component: ReaderSplashComponent},
    {path: 'author/:id', component: AuthorComponent},
    {path: 'reader/:id', component: ReaderComponent},
    {path: 'success/:id', component: SuccessComponent},
];

import { provideRouter, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { HomeComponent } from './app-views/home/home.component';
import { LoginComponent } from './app-views/login/login.component';
import { MyListComponent } from './app-views/my-list/my-list.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Auth } from '@angular/fire/auth';
import { MoviesComponent } from './app-views/movies/movies.component';
import { TvShowsComponent } from './app-views/tvShows/tvShows.component';

export const routes: Routes = [
  { path: '', canActivate: [AuthGuardService], component: HomeComponent },
  { path: 'home', canActivate: [AuthGuardService], component: HomeComponent },
  { path: 'filmes', canActivate: [AuthGuardService], component: MoviesComponent },
  { path: 'series', canActivate: [AuthGuardService], component: TvShowsComponent },
  { path: 'myList', canActivate: [AuthGuardService], component: MyListComponent },
  { path: 'sharedList/:tokenList', component: MyListComponent },
  { path: 'logout', canActivate: [AuthGuardService], component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    AuthGuardService,
    Auth
  ],
}).catch((err) => console.error(err));

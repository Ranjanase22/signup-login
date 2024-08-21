import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; 
import { LoginComponent } from './app/login/login.component';
import { HomeComponent } from './app/home/home.component';
import { SignupComponent } from './app/signup/signup.component';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthGuard } from './app/auth.guard';

// Define the routes with correct types
const routes: Routes = [
  { path: 'signup', component: SignupComponent}, // This should match your URL
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];



// Bootstrap the Angular application
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations()
  ]
});

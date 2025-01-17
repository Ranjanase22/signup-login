import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true
})
export class HomeComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('authToken'); // Clear authentication token
    this.router.navigate(['/login']); // Redirect to login page
  }
}

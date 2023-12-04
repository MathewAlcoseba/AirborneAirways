import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Import your AuthService here

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  getLoggedInUserFirstName(): string | null {
    // Check if a user is logged in
    if (this.authService.isLoggedIn()) {
      // If logged in, return the first name
      return this.authService.user.firstName;
    }

    // If not logged in, return null
    return null;
  }
  logout(): void {
    // Call the logout method from AuthService
    this.authService.logout();
  }
}


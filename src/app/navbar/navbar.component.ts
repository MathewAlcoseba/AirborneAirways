import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

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

    this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/login']);
    });
    
  }
}


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
    if (this.authService.isLoggedIn()) {
      return this.authService.user.firstName;
    }

    return null;
  }
  logout(): void {
    this.authService.logout();

    this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/login']);
    });
    
  }
}


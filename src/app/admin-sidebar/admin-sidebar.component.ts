import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  isSmallScreen = false;
  selectedItem: string | null = null;
  sidebarWidth = 20;

  constructor(private router: Router, private route: ActivatedRoute,private authService: AuthService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
    this.subscribeToRouterEvents();
    this.updateSelectedItemBasedOnRoute();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768;
  }

  selectItem(item: string): void {
    this.selectedItem = item;
  }

  toggleSidebar(): void {
    this.isSmallScreen = !this.isSmallScreen;
  }

  private subscribeToRouterEvents(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateSelectedItemBasedOnRoute();
      });
  }

  private updateSelectedItemBasedOnRoute(): void {
    const currentRoute = this.route.root;
    const child = this.getLastChild(currentRoute);
  
    if (child) {
      const path = child.routeConfig?.path || '';
  
      switch (path) {
        case 'admin-home':
          this.selectedItem = 'home';
          break;
        case 'dashboard':
          this.selectedItem = 'dashboard';
          break;
        case 'users':
          this.selectedItem = 'users';
          break;
        case 'flights':
          this.selectedItem = 'flights';
          break;
        case 'booked-flights':
          this.selectedItem = 'booked-flights';
          break;
        default:
          this.selectedItem = 'home';
          break;
      }
    }
  }
  logout(): void {
    // Perform common logout actions, e.g., clear user authentication, navigate to home page
    // For demonstration purposes, let's assume you have an AuthService with a logout method
    // Replace 'AuthService' with your actual authentication service
    this.authService.logout();
  
    // Check if the user is an admin and perform additional admin logout actions if needed
    if (this.authService.isAdmin()) {
      this.authService.adminLogout();
      // Additional logic for admin logout UI or navigation if needed
    }
  
    // After logout, navigate to the home page
    this.router.navigate(['/']);
  }


  
  private getLastChild(route: ActivatedRoute): ActivatedRoute | null {
    let currentRoute: ActivatedRoute | null = route;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }
    return currentRoute;
  }
  
  
}
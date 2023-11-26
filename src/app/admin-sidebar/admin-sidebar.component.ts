import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  isSmallScreen = false;
  selectedItem: string | null = null;
  sidebarWidth = 20;

  constructor(private router: Router, private route: ActivatedRoute) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
    this.subscribeToRouterEvents();
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
    const url = this.router.url;

    switch (url) {
      case '/admin-home':
        this.selectedItem = 'home';
        break;
      case '/dashboard':
        this.selectedItem = 'dashboard';
        break;
      case '/users':
        this.selectedItem = 'users';
        break;
      case '/flights':
        this.selectedItem = 'flights';
        break;
      case '/booked-flights':
        this.selectedItem = 'booked-flights';
        break;
      default:
        this.selectedItem = 'home';
        break;
    }
  }
}
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent {
  isSmallScreen = false;
  selectedItem: string | null = null;
  sidebarWidth = 20; 

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
    this.selectedItem = 'home';
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
}

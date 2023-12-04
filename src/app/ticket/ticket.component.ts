import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  departureCountry: string = '';
  destinationCountry: string = '';
  departureDate: string = '';
  returnDate: string = '';
  flightId: string = ''; 
  numberOfUserFlights: number = 0; 
  userFlights: any[] = [];
 
  private isDragging = false;
  private startX!: number;
  private scrollLeft!: number;

  constructor(
    private authService: AuthService,
    private angularFirestore: AngularFirestore,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    console.log('Is user logged in:', this.authService.isLoggedIn());
    if (this.authService.isLoggedIn()) {
      const currentUser = this.authService.getUser();
      // Check if naay shay bookedflights
      if (currentUser && currentUser.userId) {
        const userFlightsCollection = this.angularFirestore.collection(`users/${currentUser.userId}/userFlights`);
        // Fetch all
        userFlightsCollection
          .valueChanges()
          .subscribe((flights: any[]) => {
            this.userFlights = flights;
            console.log('User Flights:', this.userFlights);
          });
      }
    }
    this.initDragScroll();
  }

  
  private initDragScroll() {
    const wrapper = this.el.nativeElement.querySelector('.wrapper');
    this.renderer.listen(wrapper, 'mousedown', (event: MouseEvent) => {
      this.isDragging = true;
      this.startX = event.pageX - wrapper.offsetLeft;
      this.scrollLeft = wrapper.scrollLeft;
    });

    this.renderer.listen(wrapper, 'mouseleave', () => {
      this.isDragging = false;
    });

    this.renderer.listen(wrapper, 'mouseup', () => {
      this.isDragging = false;
    });

    this.renderer.listen(wrapper, 'mousemove', (event: MouseEvent) => {
      if (!this.isDragging) return;
      event.preventDefault();
      const x = event.pageX - wrapper.offsetLeft;
      const walk = (x - this.startX) * 2; // Adjust for desired scroll speed
      wrapper.scrollLeft = this.scrollLeft - walk;
    });
  }
}
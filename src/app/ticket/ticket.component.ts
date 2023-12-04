import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';


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
  flightId: string = ''; // Placeholder for flightId
  numberOfUserFlights: number = 0; 
  userFlights: any[] = [];
  // Add properties for seat and gate as needed

  constructor(
    private authService: AuthService,
    private angularFirestore: AngularFirestore
  ) {}

  ngOnInit() {
    console.log('Is user logged in:', this.authService.isLoggedIn());
    if (this.authService.isLoggedIn()) {
      // Get the currently logged-in user
      const currentUser = this.authService.getUser();
      // Check if the user has a subcollection 'userFlights'
      if (currentUser && currentUser.userId) {
        const userFlightsCollection = this.angularFirestore.collection(`users/${currentUser.userId}/userFlights`);

        // Fetch all user flights
        userFlightsCollection
          .valueChanges()
          .subscribe((flights: any[]) => {
            this.userFlights = flights;
            console.log('User Flights:', this.userFlights);
          });
      }
    }
  }

  

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  originOptions: string[] = [];
  destinationOptions: string[] = [];
  flights: any[] = [];
  selectedDepartureCountry: string = '';
  selectedDestinationCountry: string = '';
  departureSearchQuery: string = '';
  destinationSearchQuery: string = '';
  isRoundTripSelected: boolean = true;
  filteredDepartureCountries: string[] = [];
  filteredDestinationCountries: string[] = [];
  departureDate: string = '';
  returnDate: string = '';
  selectedTripType: string = 'Round-trip';





  constructor(
    private authService: AuthService,
    private router: Router,
    private angularFirestore: AngularFirestore,
    // private sharedService: SharedService
  ) { }
  
  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isLoggedIn();
    // Fetch the list of origins from Firestore
    this.angularFirestore.collection('flights').valueChanges()
      .pipe(take(1))
      .subscribe((flights: any[]) => {
        this.flights = flights;
        this.originOptions = Array.from(new Set(flights.map(flight => flight.origin)));
      });
  }


  selectDepartureCountry(origin: string): void {
    this.selectedDepartureCountry = origin;
    // this.sharedService.changeDepartureCountry(origin);
    this.destinationOptions = this.flights
      .filter(flight => flight.origin === origin)
      .map(flight => flight.destination);
  
    // Set the departureSearchQuery to the selected origin
    this.departureSearchQuery = origin;
  
    // Reset the selected destination country when a new departure country is selected
    this.selectedDestinationCountry = '';
    this.destinationSearchQuery = '';
    // Update the filtered destination countries based on the new destination options
    this.filterDestinationCountries();
  }
  
  

  selectDestinationCountry(country: string): void {
    this.selectedDestinationCountry = country;
    // this.sharedService.changeDestinationCountry(country); 
    this.destinationSearchQuery = country;
    // Additional logic if needed
  }

  filterDepartureCountries(): void {
    this.filteredDepartureCountries = this.selectedDepartureCountry ?
      this.originOptions.filter(origin =>
        origin.toLowerCase().includes(this.selectedDepartureCountry.toLowerCase())
      ) : this.originOptions;
  }
  
  filterDestinationCountries(): void {
    this.filteredDestinationCountries = this.selectedDestinationCountry ?
      this.destinationOptions.filter(destination =>
        destination.toLowerCase().includes(this.selectedDestinationCountry.toLowerCase())
      ) : this.destinationOptions;
  }  
  

  onRadioChange(value: string): void {
    this.isRoundTripSelected = value === 'Round-trip';
  }
 
  
  
  bookFlight(): void {
    console.log('Is user logged in:', this.authService.isLoggedIn());
    if (this.authService.isLoggedIn()) {
      console.log('User UID:', this.authService.getUser().userId);

      if (this.selectedDepartureCountry && this.selectedDestinationCountry) {
        // Validate if the selected origin and destination exist in flights
        const flight = this.flights.find(f =>
          f.origin === this.selectedDepartureCountry &&
          f.destination === this.selectedDestinationCountry
        );
  
        console.log('Selected flight:', flight);
        console.log('All flights:', this.flights);
  
        if (flight) {
          // Calculate ticket price based on flight type
          const ticketPrice = this.isRoundTripSelected
            ? flight.ticketPrice * 2 * 0.9  // 10% discount for round-trip
            : flight.ticketPrice;
  
          // Create userFlight object
          const userFlight = {
            flightId: flight.flightId,
            origin: flight.origin,
            destination: flight.destination,
            flightType: this.isRoundTripSelected ? 'Round-trip' : 'One-way',
            ticketPrice: ticketPrice,
            departureDate: this.departureDate,
            returnDate: this.isRoundTripSelected ? this.returnDate : null,
          };
          console.log('Selected flight:', userFlight);

          // Use the custom userId property to get the user's document
          const userId = this.authService.getUser().userId;
          const userCollection = this.angularFirestore.collection('users').doc(userId);
  
          // Add userFlight to user's userFlights collection
          userCollection.collection('userFlights').add(userFlight)
            .then(() => alert('Flight booked successfully!'))
            .catch(error => alert('Error booking flight: ' + error));
        } else {
          alert('Invalid flight selection. Please choose a valid origin and destination.');
        }
      } else {
        alert('Please select origin and destination before booking.');
      }
    } else {
      alert('Please log in to book a flight.');
      this.router.navigate(['/login']);
    }
  }

  

  onSelectTripType(option: string): void {
    this.selectedTripType = option;
    this.isRoundTripSelected = option === 'Round-trip';
  }
  
  // onDateChange(): void {
  //   this.sharedService.changeDepartureDate(this.departureDate);
  // }
  // onReturnDateChange(): void {
  //   this.sharedService.changeReturnDate(this.returnDate);
  // }
  
}
  

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
  ticketPrice: number = 0;
  showDepartureDropdown: boolean = false;


  constructor(
    private authService: AuthService,
    private router: Router,
    private angularFirestore: AngularFirestore,
  ) { }
  
  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isLoggedIn();
    this.angularFirestore.collection('flights').valueChanges()
      .pipe(take(1))
      .subscribe((flights: any[]) => {
        this.flights = flights;
        this.originOptions = Array.from(new Set(flights.map(flight => flight.origin)));
      });
  }

  calculateTicketPrice(): void {
    if (this.selectedDepartureCountry && this.selectedDestinationCountry) {
      // Find the selected flight
      const flight = this.flights.find(f =>
        f.origin === this.selectedDepartureCountry &&
        f.destination === this.selectedDestinationCountry
      );

      if (flight) {
        // ticket price calc, if round trip kay mudoble ang price pero discounted 10% hehe
        this.ticketPrice = this.isRoundTripSelected ? flight.ticketPrice * 2 * 0.9 : flight.ticketPrice;
      } else {
        this.ticketPrice = 0;
      }
    } else {
      this.ticketPrice = 0;
    }
  }

  selectDepartureCountry(origin: string): void {
    this.selectedDepartureCountry = origin;
    this.calculateTicketPrice();
    this.destinationOptions = this.flights
      .filter(flight => flight.origin === origin)
      .map(flight => flight.destination);
  
    this.departureSearchQuery = origin; 
    this.showDepartureDropdown = false;
  
    this.filterDestinationCountries();
  }
  
  

  selectDestinationCountry(country: string): void {
    this.selectedDestinationCountry = country;
    this.destinationSearchQuery = country;
    this.calculateTicketPrice();
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
          // ticket price calc, if round trip kay mudoble ang price pero discounted 10% hehe
          const ticketPrice = this.isRoundTripSelected
            ? flight.ticketPrice * 2 * 0.9  
            : flight.ticketPrice;
  
          const seat = this.generateRandomSeat();
          const gate = this.generateRandomGate();
          const flightNumber = this.generateFlightNumber(flight.origin, flight.destination);


          const userFlight = {
            flightId: flight.flightId,
            origin: flight.origin,
            destination: flight.destination,
            flightType: this.isRoundTripSelected ? 'Round-trip' : 'One-way',
            ticketPrice: ticketPrice,
            departureDate: this.departureDate,
            returnDate: this.isRoundTripSelected ? this.returnDate : null,
            seat: seat,
            gate: gate,
            flightNumber: flightNumber
          };
          console.log('Selected flight:', userFlight);

          const userId = this.authService.getUser().userId;
          const userCollection = this.angularFirestore.collection('users').doc(userId);
  
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
    this.calculateTicketPrice();
  }
  
  generateRandomSeat(): string {
    const letters = 'ABCDEFG';
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const randomNumber = Math.floor(Math.random() * 25) + 1;
    return randomLetter + randomNumber;
  }

  generateRandomGate(): number {
    return Math.floor(Math.random() * 3) + 1;
  }

  generateFlightNumber(origin: string, destination: string): string {
    const getConsonants = (str: string) => str.replace(/[aeiouAEIOU0-9]/g, '');
    const originConsonants = getConsonants(origin).slice(0, 2);
    const destinationConsonants = getConsonants(destination).slice(0, 2);
    const randomNumbers = Math.floor(100 + Math.random() * 900); 
    return originConsonants + destinationConsonants + randomNumbers;
  }

}
  

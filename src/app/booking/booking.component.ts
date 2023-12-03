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
  isRoundTripSelected: boolean = false;
  filteredDepartureCountries: string[] = [];
  filteredDestinationCountries: string[] = [];

  // countries: string[] = [
  //   "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  //   "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
  //   "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", 
  //   "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil",
  //   "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  //   "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China",
  //   "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the",
  //   "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  //   "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  //   "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  //   "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  //   "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  //   "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", 
  //   "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", 
  //   "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo",
  //   "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
  //   "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
  //   "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
  //   "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
  //   "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  //   "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
  //   "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea",
  //   "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
  //   "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
  //   "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", 
  //   "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
  //   "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan",
  //   "Sudan, South", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
  //   "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga",
  //   "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  //   "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
  //   "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  //   "Yemen", "Zambia", "Zimbabwe"
  // ];
  
  // selectedDepartureCountry: string = '';
  // selectedDestinationCountry: string = '';
  // departureSearchQuery: string = '';
  // destinationSearchQuery: string = '';
  selectedTripType: string = 'Round-Trip';



  constructor(
    private authService: AuthService,
    private router: Router,
    private angularFirestore: AngularFirestore // Inject AngularFirestore
  ) { }
  
  ngOnInit(): void {
    // Fetch the list of origins from Firestore
    this.angularFirestore.collection('flights').valueChanges()
      .pipe(take(1))
      .subscribe((flights: any[]) => {
        this.flights = flights;
        this.originOptions = Array.from(new Set(flights.map(flight => flight.origin)));
      });
  }

  // filterDepartureCountries(): void {
  //   this.filteredDepartureCountries = this.departureSearchQuery ?
  //     this.countries.filter(country =>
  //       country.toLowerCase().includes(this.departureSearchQuery.toLowerCase())
  //     ) : this.countries;

  // }

  // filterDestinationCountries(): void {
  //   this.filteredDestinationCountries = this.destinationSearchQuery ?
  //     this.countries.filter(country =>
  //       country.toLowerCase().includes(this.destinationSearchQuery.toLowerCase())
  //     ) : this.countries;
  // }

  selectDepartureCountry(origin: string): void {
    this.selectedDepartureCountry = origin;
    this.destinationOptions = this.flights
      .filter(flight => flight.origin === origin)
      .map(flight => flight.destination);
  
    // Reset the selected destination country when a new departure country is selected
    this.selectedDestinationCountry = '';
    this.destinationSearchQuery = '';
    // Update the filtered destination countries based on the new destination options
    this.filterDestinationCountries();
  }
  

  selectDestinationCountry(country: string): void {
    this.selectedDestinationCountry = country;
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
    if (this.authService.isLoggedIn()) {
      if (this.isRoundTripSelected) {
        // Implement logic for round-trip flight booking
        // You can use this.selectedDepartureCountry and this.selectedDestinationCountry
        // to get the selected departure and destination countries
        alert('Round-trip flight booked!');
      } else {
        // Implement logic for one-way flight booking
        // You can use this.selectedDepartureCountry and this.selectedDestinationCountry
        // to get the selected departure and destination countries
        alert('One-way flight booked!');
      }
    } else {
      alert('Please log in to book a flight.');
      this.router.navigate(['/login']);
    }
  }
  onSelectTripType(option: string): void {
    this.selectedTripType = option;
  }
  
  
}
  


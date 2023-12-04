import { Component, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface BookedFlight {
  flightId: string;
  flightType: string;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string | null;
  ticketPrice: number;
  userId: string;
  fullName: string;
  email: string;
}

@Component({
  selector: 'app-admin-booked-flights',
  templateUrl: './admin-booked-flights.component.html',
  styleUrls: ['./admin-booked-flights.component.scss']
})
export class AdminBookedFlightsComponent implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  bookedFlights: BookedFlight[] = [];

  constructor(private angularFirestore: AngularFirestore) {
    this.getDataFromFirestore();
  }

  getDataFromFirestore() {
    this.angularFirestore
      .collection<User>('users')
      .valueChanges()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((users: User[]) => {
        // Reset the bookedFlights array
        this.bookedFlights = [];

        // Iterate through each user
        users.forEach(user => {
          // Fetch the userFlights subcollection for the current user
          this.angularFirestore
            .collection('users')
            .doc(user.userId)
            .collection<BookedFlight>('userFlights')
            .valueChanges()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe({
              next: (userFlights: BookedFlight[]) => {
                // Concatenate the user's full name to each userFlight
                const userFlightsWithFullName = userFlights.map(flight => ({
                  ...flight,
                  fullName: `${user.firstName} ${user.lastName}`,
                  userId: user.userId,
                  email: user.email,
                }));

                // Concatenate the fetched userFlights to the bookedFlights array
                this.bookedFlights = this.bookedFlights.concat(userFlightsWithFullName);
              },
              error: (error) => {
                // Handle errors here
                console.error('Error fetching userFlights:', error);
              },
              complete: () => {
                // You can add additional completion logic if needed
              }
            });
        });
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

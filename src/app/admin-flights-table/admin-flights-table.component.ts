import { Component, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface Flight {
  flightId: string;
  ticketPrice: number;
  origin: string;
  destination: string;
}

@Component({
  selector: 'app-admin-flights-table',
  templateUrl: './admin-flights-table.component.html',
  styleUrls: ['./admin-flights-table.component.scss']
})
export class AdminFlightsTableComponent implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  flights: Flight[] = [];

  constructor(private angularFirestore: AngularFirestore) {
    this.getDataFromFirestore();
  }

  getDataFromFirestore() {
    this.angularFirestore
      .collection<Flight>('flights')
      .valueChanges()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((flights: Flight[]) => {
        this.flights = flights;
      });
  }

  addFlight(formData: any) {
    const flightId = this.angularFirestore.createId();
    const flightData: Flight = {
      flightId,
      ticketPrice: formData.value.ticketPrice,
      origin: formData.value.origin,
      destination: formData.value.destination,
    };

    this.angularFirestore
      .collection('flights')
      .doc(flightId)
      .set(flightData)
      .then(() => {
        alert(`Flight with ID ${flightId} added successfully.`);
        formData.resetForm();
      })
      .catch((error) => {
        alert(`Failed to add flight`);
        console.error('Error adding flight:', error);
      });
  }

  deleteFlight(flightId: string) {
    const flightDocRef = this.angularFirestore.collection('flights').doc(flightId);

    flightDocRef.delete().then(() => {
      alert(`Flight with ID ${flightId} deleted successfully.`);
    }).catch((error) => {
      console.error(`Error deleting flight with ID ${flightId}: `, error);
      alert(`Failed to delete flight`);
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

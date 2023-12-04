import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit, OnDestroy {
  numberOfUsers: number = 0;
  numberOfFlights: number = 0;
  numberOfUserFlights: number = 0;
  currentDate: string = new Date().toLocaleDateString();

  private unsubscribe$ = new Subject<void>();

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.fetchUserData();
    this.fetchFlightData();
    this.fetchUserFlightData();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  fetchUserData() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'id' })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((users: any[]) => {
        this.numberOfUsers = users.length;
      });
  }


  fetchFlightData() {
    this.firestore
      .collection('flights')
      .valueChanges({ idField: 'id' })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((flights: any[]) => {
        this.numberOfFlights = flights.length;
      });
  }


fetchUserFlightData() {
  this.firestore
    .collectionGroup('userFlights')  
    .valueChanges({ idField: 'id' })
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((userFlights: any[]) => {
      this.numberOfUserFlights = userFlights.length;
    });
}

}

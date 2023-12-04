import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private departureCountrySource = new BehaviorSubject<string>('');
  private destinationCountrySource = new BehaviorSubject<string>('');
  private departureDateSource = new BehaviorSubject<string>('');
  private returnDateSource = new BehaviorSubject<string>('');
  currentReturnDate = this.returnDateSource.asObservable();
  currentDepartureDate = this.departureDateSource.asObservable();
  currentDepartureCountry = this.departureCountrySource.asObservable();
  currentDestinationCountry = this.destinationCountrySource.asObservable();
  

  constructor() {}

  changeDepartureCountry(country: string) {
    this.departureCountrySource.next(country);
  }

  changeDestinationCountry(country: string) {
    this.destinationCountrySource.next(country);
  }

  changeDepartureDate(date: string) {
    this.departureDateSource.next(date);
  }

  changeReturnDate(date: string) {
    this.returnDateSource.next(date);
  }
}

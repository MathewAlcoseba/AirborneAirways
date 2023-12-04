import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  departureCountry: string = '';
  destinationCountry: string = '';
  departureDate!: string;
  returnDate!: string;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.currentDepartureCountry.subscribe(country => this.departureCountry = country);
    this.sharedService.currentDestinationCountry.subscribe(country => this.destinationCountry = country);
    this.sharedService.currentDepartureDate.subscribe(date => this.departureDate = date);
    this.sharedService.currentReturnDate.subscribe(date => this.returnDate = date);
  }
}

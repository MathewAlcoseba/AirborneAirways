import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookedFlightsComponent } from './admin-booked-flights.component';

describe('AdminBookedFlightsComponent', () => {
  let component: AdminBookedFlightsComponent;
  let fixture: ComponentFixture<AdminBookedFlightsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBookedFlightsComponent]
    });
    fixture = TestBed.createComponent(AdminBookedFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

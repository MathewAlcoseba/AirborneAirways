import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFlightsTableComponent } from './admin-flights-table.component';

describe('AdminFlightsTableComponent', () => {
  let component: AdminFlightsTableComponent;
  let fixture: ComponentFixture<AdminFlightsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFlightsTableComponent]
    });
    fixture = TestBed.createComponent(AdminFlightsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

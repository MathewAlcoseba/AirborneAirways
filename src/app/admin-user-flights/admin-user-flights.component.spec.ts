import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserFlightsComponent } from './admin-user-flights.component';

describe('AdminUserFlightsComponent', () => {
  let component: AdminUserFlightsComponent;
  let fixture: ComponentFixture<AdminUserFlightsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUserFlightsComponent]
    });
    fixture = TestBed.createComponent(AdminUserFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

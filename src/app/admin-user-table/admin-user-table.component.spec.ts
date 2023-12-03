import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserTableComponent } from './admin-user-table.component';

describe('AdminUserTableComponent', () => {
  let component: AdminUserTableComponent;
  let fixture: ComponentFixture<AdminUserTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUserTableComponent]
    });
    fixture = TestBed.createComponent(AdminUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

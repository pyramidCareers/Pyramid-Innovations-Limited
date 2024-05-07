import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotBookingRequestModalComponent } from './timeslot-booking-request-modal.component';

describe('TimeslotBookingRequestModalComponent', () => {
  let component: TimeslotBookingRequestModalComponent;
  let fixture: ComponentFixture<TimeslotBookingRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeslotBookingRequestModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeslotBookingRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

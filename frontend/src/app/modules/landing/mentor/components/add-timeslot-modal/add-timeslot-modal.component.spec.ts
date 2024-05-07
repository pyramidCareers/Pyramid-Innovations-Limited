import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimeslotModalComponent } from './add-timeslot-modal.component';

describe('AddTimeslotModalComponent', () => {
  let component: AddTimeslotModalComponent;
  let fixture: ComponentFixture<AddTimeslotModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTimeslotModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTimeslotModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

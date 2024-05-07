import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarPaymentStatusComponent } from './webinar-payment-status.component';

describe('WebinarPaymentStatusComponent', () => {
  let component: WebinarPaymentStatusComponent;
  let fixture: ComponentFixture<WebinarPaymentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebinarPaymentStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebinarPaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

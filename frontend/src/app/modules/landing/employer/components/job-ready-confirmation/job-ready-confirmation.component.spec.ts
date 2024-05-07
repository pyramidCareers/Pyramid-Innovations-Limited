import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobReadyConfirmationComponent } from './job-ready-confirmation.component';

describe('JobReadyConfirmationComponent', () => {
  let component: JobReadyConfirmationComponent;
  let fixture: ComponentFixture<JobReadyConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobReadyConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobReadyConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

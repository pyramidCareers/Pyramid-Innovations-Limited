import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCreateConfirmationModalComponent } from './job-create-confirmation-modal.component';

describe('JobCreateConfirmationModalComponent', () => {
  let component: JobCreateConfirmationModalComponent;
  let fixture: ComponentFixture<JobCreateConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobCreateConfirmationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobCreateConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

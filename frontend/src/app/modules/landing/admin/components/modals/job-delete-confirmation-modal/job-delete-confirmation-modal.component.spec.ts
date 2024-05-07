import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDeleteConfirmationModalComponent } from './job-delete-confirmation-modal.component';

describe('JobDeleteConfirmationModalComponent', () => {
  let component: JobDeleteConfirmationModalComponent;
  let fixture: ComponentFixture<JobDeleteConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDeleteConfirmationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobDeleteConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

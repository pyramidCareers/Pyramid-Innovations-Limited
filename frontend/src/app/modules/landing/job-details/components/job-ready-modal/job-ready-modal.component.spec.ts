import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobReadyModalComponent } from './job-ready-modal.component';

describe('JobReadyModalComponent', () => {
  let component: JobReadyModalComponent;
  let fixture: ComponentFixture<JobReadyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobReadyModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobReadyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerReportComponent } from './jobseeker-report.component';

describe('JobseekerReportComponent', () => {
  let component: JobseekerReportComponent;
  let fixture: ComponentFixture<JobseekerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobseekerReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobseekerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

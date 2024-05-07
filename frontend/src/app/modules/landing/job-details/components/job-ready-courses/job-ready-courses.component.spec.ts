import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobReadyCoursesComponent } from './job-ready-courses.component';

describe('JobReadyCoursesComponent', () => {
  let component: JobReadyCoursesComponent;
  let fixture: ComponentFixture<JobReadyCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobReadyCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobReadyCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

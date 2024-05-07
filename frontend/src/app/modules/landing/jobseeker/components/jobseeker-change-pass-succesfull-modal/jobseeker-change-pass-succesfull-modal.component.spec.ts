import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerChangePassSuccesfullModalComponent } from './jobseeker-change-pass-succesfull-modal.component';

describe('JobseekerChangePassSuccesfullModalComponent', () => {
  let component: JobseekerChangePassSuccesfullModalComponent;
  let fixture: ComponentFixture<JobseekerChangePassSuccesfullModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobseekerChangePassSuccesfullModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobseekerChangePassSuccesfullModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

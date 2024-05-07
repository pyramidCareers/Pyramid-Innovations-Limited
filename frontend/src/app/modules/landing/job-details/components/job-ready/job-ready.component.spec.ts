import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobReadyComponent } from './job-ready.component';

describe('JobReadyComponent', () => {
  let component: JobReadyComponent;
  let fixture: ComponentFixture<JobReadyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobReadyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

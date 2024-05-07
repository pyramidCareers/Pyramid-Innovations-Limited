import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingJobsPromptComponent } from './finding-jobs-prompt.component';

describe('FindingJobsPromptComponent', () => {
  let component: FindingJobsPromptComponent;
  let fixture: ComponentFixture<FindingJobsPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindingJobsPromptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindingJobsPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

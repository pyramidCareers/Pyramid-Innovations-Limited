import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyModalJobListComponent } from './apply-modal-job-list.component';

describe('ApplyModalJobListComponent', () => {
  let component: ApplyModalJobListComponent;
  let fixture: ComponentFixture<ApplyModalJobListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyModalJobListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyModalJobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

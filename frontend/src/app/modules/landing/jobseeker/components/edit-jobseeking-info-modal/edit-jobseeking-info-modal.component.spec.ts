import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobseekingInfoModalComponent } from './edit-jobseeking-info-modal.component';

describe('EditJobseekingInfoModalComponent', () => {
  let component: EditJobseekingInfoModalComponent;
  let fixture: ComponentFixture<EditJobseekingInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditJobseekingInfoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditJobseekingInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorEditBasicInfoModalComponent } from './mentor-edit-basic-info-modal.component';

describe('MentorEditBasicInfoModalComponent', () => {
  let component: MentorEditBasicInfoModalComponent;
  let fixture: ComponentFixture<MentorEditBasicInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorEditBasicInfoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorEditBasicInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

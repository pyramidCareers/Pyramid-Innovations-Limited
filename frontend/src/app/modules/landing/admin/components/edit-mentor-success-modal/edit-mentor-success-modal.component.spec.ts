import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMentorSuccessModalComponent } from './edit-mentor-success-modal.component';

describe('EditMentorSuccessModalComponent', () => {
  let component: EditMentorSuccessModalComponent;
  let fixture: ComponentFixture<EditMentorSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMentorSuccessModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMentorSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

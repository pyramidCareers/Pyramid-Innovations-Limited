import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMentorSuccessModalComponent } from './create-mentor-success-modal.component';

describe('CreateMentorSuccessModalComponent', () => {
  let component: CreateMentorSuccessModalComponent;
  let fixture: ComponentFixture<CreateMentorSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMentorSuccessModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMentorSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorEditAboutModalComponent } from './mentor-edit-about-modal.component';

describe('MentorEditAboutModalComponent', () => {
  let component: MentorEditAboutModalComponent;
  let fixture: ComponentFixture<MentorEditAboutModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorEditAboutModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorEditAboutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

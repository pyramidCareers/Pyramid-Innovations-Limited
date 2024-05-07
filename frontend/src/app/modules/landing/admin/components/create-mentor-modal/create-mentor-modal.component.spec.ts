import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMentorModalComponent } from './create-mentor-modal.component';

describe('CreateMentorModalComponent', () => {
  let component: CreateMentorModalComponent;
  let fixture: ComponentFixture<CreateMentorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMentorModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMentorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorSessionComponent } from './mentor-session.component';

describe('MentorSessionComponent', () => {
  let component: MentorSessionComponent;
  let fixture: ComponentFixture<MentorSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

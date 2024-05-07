import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorProfileUpdateReqComponent } from './mentor-profile-update-req.component';

describe('MentorProfileUpdateReqComponent', () => {
  let component: MentorProfileUpdateReqComponent;
  let fixture: ComponentFixture<MentorProfileUpdateReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorProfileUpdateReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorProfileUpdateReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

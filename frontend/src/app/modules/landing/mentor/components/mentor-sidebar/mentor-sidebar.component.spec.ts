import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorSidebarComponent } from './mentor-sidebar.component';

describe('MentorSidebarComponent', () => {
  let component: MentorSidebarComponent;
  let fixture: ComponentFixture<MentorSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

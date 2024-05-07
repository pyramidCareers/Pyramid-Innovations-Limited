import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseItemComponent } from './admin-course-item.component';

describe('AdminCourseItemComponent', () => {
  let component: AdminCourseItemComponent;
  let fixture: ComponentFixture<AdminCourseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCourseItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCourseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

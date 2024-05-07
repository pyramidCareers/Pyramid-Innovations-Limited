import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteJobReadyCourseComponent } from './delete-job-ready-course.component';

describe('DeleteJobReadyCourseComponent', () => {
  let component: DeleteJobReadyCourseComponent;
  let fixture: ComponentFixture<DeleteJobReadyCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteJobReadyCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteJobReadyCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

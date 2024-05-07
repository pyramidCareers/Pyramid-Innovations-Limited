import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobCircularComponent } from './create-job-circular.component';

describe('CreateJobCircularComponent', () => {
  let component: CreateJobCircularComponent;
  let fixture: ComponentFixture<CreateJobCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateJobCircularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateJobCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

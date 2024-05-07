import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobCircularComponent } from './edit-job-circular.component';

describe('EditJobCircularComponent', () => {
  let component: EditJobCircularComponent;
  let fixture: ComponentFixture<EditJobCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditJobCircularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditJobCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

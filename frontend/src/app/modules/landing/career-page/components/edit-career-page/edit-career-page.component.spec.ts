import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCareerPageComponent } from './edit-career-page.component';

describe('EditCareerPageComponent', () => {
  let component: EditCareerPageComponent;
  let fixture: ComponentFixture<EditCareerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCareerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCareerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

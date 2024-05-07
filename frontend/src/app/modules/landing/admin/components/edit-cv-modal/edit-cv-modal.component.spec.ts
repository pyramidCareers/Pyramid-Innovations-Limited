import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCvModalComponent } from './edit-cv-modal.component';

describe('EditCvModalComponent', () => {
  let component: EditCvModalComponent;
  let fixture: ComponentFixture<EditCvModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCvModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCvModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

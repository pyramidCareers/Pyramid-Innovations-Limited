import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCvModalComponent } from './add-cv-modal.component';

describe('AddCvModalComponent', () => {
  let component: AddCvModalComponent;
  let fixture: ComponentFixture<AddCvModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCvModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCvModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

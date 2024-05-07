import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCerificationModalComponent } from './add-cerification-modal.component';

describe('AddCerificationModalComponent', () => {
  let component: AddCerificationModalComponent;
  let fixture: ComponentFixture<AddCerificationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCerificationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCerificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

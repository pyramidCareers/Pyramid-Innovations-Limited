import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCerificationModalComponent } from './edit-cerification-modal.component';

describe('EditCerificationModalComponent', () => {
  let component: EditCerificationModalComponent;
  let fixture: ComponentFixture<EditCerificationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCerificationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCerificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

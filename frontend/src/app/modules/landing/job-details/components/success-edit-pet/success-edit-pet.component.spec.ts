import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessEditPetComponent } from './success-edit-pet.component';

describe('SuccessEditPetComponent', () => {
  let component: SuccessEditPetComponent;
  let fixture: ComponentFixture<SuccessEditPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessEditPetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessEditPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

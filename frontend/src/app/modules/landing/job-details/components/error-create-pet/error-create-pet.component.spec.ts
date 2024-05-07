import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorCreatePetComponent } from './error-create-pet.component';

describe('ErrorCreatePetComponent', () => {
  let component: ErrorCreatePetComponent;
  let fixture: ComponentFixture<ErrorCreatePetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorCreatePetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorCreatePetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

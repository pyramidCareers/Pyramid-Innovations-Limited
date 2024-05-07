import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessCreatePetComponent } from './success-create-pet.component';

describe('SuccessCreatePetComponent', () => {
  let component: SuccessCreatePetComponent;
  let fixture: ComponentFixture<SuccessCreatePetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessCreatePetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessCreatePetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

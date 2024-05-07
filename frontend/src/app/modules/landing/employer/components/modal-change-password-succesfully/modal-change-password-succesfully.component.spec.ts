import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangePasswordSuccesfullyComponent } from './modal-change-password-succesfully.component';

describe('ModalChangePasswordSuccesfullyComponent', () => {
  let component: ModalChangePasswordSuccesfullyComponent;
  let fixture: ComponentFixture<ModalChangePasswordSuccesfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalChangePasswordSuccesfullyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalChangePasswordSuccesfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

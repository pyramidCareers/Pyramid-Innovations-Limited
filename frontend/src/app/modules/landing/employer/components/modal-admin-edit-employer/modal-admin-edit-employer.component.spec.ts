import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminEditEmployerComponent } from './modal-admin-edit-employer.component';

describe('ModalAdminEditEmployerComponent', () => {
  let component: ModalAdminEditEmployerComponent;
  let fixture: ComponentFixture<ModalAdminEditEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdminEditEmployerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdminEditEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

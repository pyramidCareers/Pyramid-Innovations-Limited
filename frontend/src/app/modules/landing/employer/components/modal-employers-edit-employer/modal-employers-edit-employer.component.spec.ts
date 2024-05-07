import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmployersEditEmployerComponent } from './modal-employers-edit-employer.component';

describe('ModalEmployersEditEmployerComponent', () => {
  let component: ModalEmployersEditEmployerComponent;
  let fixture: ComponentFixture<ModalEmployersEditEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEmployersEditEmployerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEmployersEditEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditJobComponent } from './modal-edit-job.component';

describe('ModalEditJobComponent', () => {
  let component: ModalEditJobComponent;
  let fixture: ComponentFixture<ModalEditJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

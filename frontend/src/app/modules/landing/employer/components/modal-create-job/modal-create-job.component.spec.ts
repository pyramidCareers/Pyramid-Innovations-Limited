import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateJobComponent } from './modal-create-job.component';

describe('ModalCreateJobComponent', () => {
  let component: ModalCreateJobComponent;
  let fixture: ComponentFixture<ModalCreateJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

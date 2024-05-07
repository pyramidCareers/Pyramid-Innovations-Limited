import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPostJobComponent } from './modal-post-job.component';

describe('ModalPostJobComponent', () => {
  let component: ModalPostJobComponent;
  let fixture: ComponentFixture<ModalPostJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPostJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPostJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

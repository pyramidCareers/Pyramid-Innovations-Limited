import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCertificationModalComponent } from './delete-certification-modal.component';

describe('DeleteCertificationModalComponent', () => {
  let component: DeleteCertificationModalComponent;
  let fixture: ComponentFixture<DeleteCertificationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCertificationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCertificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCvModalComponent } from './delete-cv-modal.component';

describe('DeleteCvModalComponent', () => {
  let component: DeleteCvModalComponent;
  let fixture: ComponentFixture<DeleteCvModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCvModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCvModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExtraCurricularModalComponent } from './add-extra-curricular-modal.component';

describe('AddExtraCurricularModalComponent', () => {
  let component: AddExtraCurricularModalComponent;
  let fixture: ComponentFixture<AddExtraCurricularModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExtraCurricularModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExtraCurricularModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

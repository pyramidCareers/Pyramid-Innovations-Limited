import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExtraCurricularModalComponent } from './edit-extra-curricular-modal.component';

describe('EditExtraCurricularModalComponent', () => {
  let component: EditExtraCurricularModalComponent;
  let fixture: ComponentFixture<EditExtraCurricularModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExtraCurricularModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExtraCurricularModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

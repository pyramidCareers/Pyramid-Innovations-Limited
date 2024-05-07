import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveExtraCurricularModalComponent } from './remove-extra-curricular-modal.component';

describe('RemoveExtraCurricularModalComponent', () => {
  let component: RemoveExtraCurricularModalComponent;
  let fixture: ComponentFixture<RemoveExtraCurricularModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveExtraCurricularModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveExtraCurricularModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

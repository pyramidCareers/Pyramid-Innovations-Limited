import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifiedExamComponent } from './certified-exam.component';

describe('CertifiedExamComponent', () => {
  let component: CertifiedExamComponent;
  let fixture: ComponentFixture<CertifiedExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertifiedExamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertifiedExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

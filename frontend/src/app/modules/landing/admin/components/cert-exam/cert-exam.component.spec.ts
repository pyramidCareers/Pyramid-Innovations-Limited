import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertExamComponent } from './cert-exam.component';

describe('CertExamComponent', () => {
  let component: CertExamComponent;
  let fixture: ComponentFixture<CertExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertExamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

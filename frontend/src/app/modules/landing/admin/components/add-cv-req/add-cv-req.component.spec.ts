import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCvReqComponent } from './add-cv-req.component';

describe('AddCvReqComponent', () => {
  let component: AddCvReqComponent;
  let fixture: ComponentFixture<AddCvReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCvReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCvReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCvReqComponent } from './edit-cv-req.component';

describe('EditCvReqComponent', () => {
  let component: EditCvReqComponent;
  let fixture: ComponentFixture<EditCvReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCvReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCvReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

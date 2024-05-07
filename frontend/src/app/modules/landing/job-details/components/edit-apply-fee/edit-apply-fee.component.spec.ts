import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApplyFeeComponent } from './edit-apply-fee.component';

describe('EditApplyFeeComponent', () => {
  let component: EditApplyFeeComponent;
  let fixture: ComponentFixture<EditApplyFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditApplyFeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditApplyFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

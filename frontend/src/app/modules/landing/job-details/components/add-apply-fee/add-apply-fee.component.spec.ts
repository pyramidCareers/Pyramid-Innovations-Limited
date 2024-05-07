import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplyFeeComponent } from './add-apply-fee.component';

describe('AddApplyFeeComponent', () => {
  let component: AddApplyFeeComponent;
  let fixture: ComponentFixture<AddApplyFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddApplyFeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddApplyFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

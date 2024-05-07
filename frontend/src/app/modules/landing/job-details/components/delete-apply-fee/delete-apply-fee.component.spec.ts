import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteApplyFeeComponent } from './delete-apply-fee.component';

describe('DeleteApplyFeeComponent', () => {
  let component: DeleteApplyFeeComponent;
  let fixture: ComponentFixture<DeleteApplyFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteApplyFeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteApplyFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

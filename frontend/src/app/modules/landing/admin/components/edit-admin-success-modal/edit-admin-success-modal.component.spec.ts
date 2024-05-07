import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminSuccessModalComponent } from './edit-admin-success-modal.component';

describe('EditAdminSuccessModalComponent', () => {
  let component: EditAdminSuccessModalComponent;
  let fixture: ComponentFixture<EditAdminSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdminSuccessModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdminSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

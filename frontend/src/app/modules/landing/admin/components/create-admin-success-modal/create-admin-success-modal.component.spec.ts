import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminSuccessModalComponent } from './create-admin-success-modal.component';

describe('CreateAdminSuccessModalComponent', () => {
  let component: CreateAdminSuccessModalComponent;
  let fixture: ComponentFixture<CreateAdminSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAdminSuccessModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAdminSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

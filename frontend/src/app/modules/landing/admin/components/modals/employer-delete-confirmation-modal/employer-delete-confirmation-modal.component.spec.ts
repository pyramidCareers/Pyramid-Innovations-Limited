import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerDeleteConfirmationModalComponent } from './employer-delete-confirmation-modal.component';

describe('EmployerDeleteConfirmationModalComponent', () => {
  let component: EmployerDeleteConfirmationModalComponent;
  let fixture: ComponentFixture<EmployerDeleteConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerDeleteConfirmationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerDeleteConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

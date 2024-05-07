import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerEditSuccesfullModalComponent } from './employer-edit-succesfull-modal.component';

describe('EmployerEditSuccesfullModalComponent', () => {
  let component: EmployerEditSuccesfullModalComponent;
  let fixture: ComponentFixture<EmployerEditSuccesfullModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerEditSuccesfullModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerEditSuccesfullModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

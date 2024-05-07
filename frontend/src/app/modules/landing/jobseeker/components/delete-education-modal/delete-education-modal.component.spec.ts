import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEducationModalComponent } from './delete-education-modal.component';

describe('DeleteEducationModalComponent', () => {
  let component: DeleteEducationModalComponent;
  let fixture: ComponentFixture<DeleteEducationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteEducationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteEducationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

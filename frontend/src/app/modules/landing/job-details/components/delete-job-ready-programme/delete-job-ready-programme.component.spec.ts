import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteJobReadyProgrammeComponent } from './delete-job-ready-programme.component';

describe('DeleteJobReadyProgrammeComponent', () => {
  let component: DeleteJobReadyProgrammeComponent;
  let fixture: ComponentFixture<DeleteJobReadyProgrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteJobReadyProgrammeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteJobReadyProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

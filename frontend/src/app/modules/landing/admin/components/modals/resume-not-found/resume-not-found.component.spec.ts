import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeNotFoundComponent } from './resume-not-found.component';

describe('ResumeNotFoundComponent', () => {
  let component: ResumeNotFoundComponent;
  let fixture: ComponentFixture<ResumeNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeNotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

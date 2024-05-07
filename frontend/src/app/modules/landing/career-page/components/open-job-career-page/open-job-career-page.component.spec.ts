import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenJobCareerPageComponent } from './open-job-career-page.component';

describe('OpenJobCareerPageComponent', () => {
  let component: OpenJobCareerPageComponent;
  let fixture: ComponentFixture<OpenJobCareerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenJobCareerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenJobCareerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

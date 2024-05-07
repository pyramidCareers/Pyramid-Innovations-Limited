import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeAtCareerPageComponent } from './life-at-career-page.component';

describe('LifeAtCareerPageComponent', () => {
  let component: LifeAtCareerPageComponent;
  let fixture: ComponentFixture<LifeAtCareerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeAtCareerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeAtCareerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

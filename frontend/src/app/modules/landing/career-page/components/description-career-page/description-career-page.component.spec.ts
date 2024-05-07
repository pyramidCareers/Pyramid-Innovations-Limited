import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionCareerPageComponent } from './description-career-page.component';

describe('DescriptionCareerPageComponent', () => {
  let component: DescriptionCareerPageComponent;
  let fixture: ComponentFixture<DescriptionCareerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionCareerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionCareerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

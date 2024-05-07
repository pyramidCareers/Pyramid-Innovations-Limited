import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FresherProfileMakingComponent } from './fresher-profile-making.component';

describe('FresherProfileMakingComponent', () => {
  let component: FresherProfileMakingComponent;
  let fixture: ComponentFixture<FresherProfileMakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FresherProfileMakingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FresherProfileMakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

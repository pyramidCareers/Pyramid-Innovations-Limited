import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMakingOptionsComponent } from './profile-making-options.component';

describe('ProfileMakingOptionsComponent', () => {
  let component: ProfileMakingOptionsComponent;
  let fixture: ComponentFixture<ProfileMakingOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMakingOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileMakingOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

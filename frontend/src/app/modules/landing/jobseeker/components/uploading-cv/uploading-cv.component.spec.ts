import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadingCvComponent } from './uploading-cv.component';

describe('UploadingCvComponent', () => {
  let component: UploadingCvComponent;
  let fixture: ComponentFixture<UploadingCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadingCvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadingCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

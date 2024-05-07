import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarDetailsComponent } from './webinar-details.component';

describe('WebinarDetailsComponent', () => {
  let component: WebinarDetailsComponent;
  let fixture: ComponentFixture<WebinarDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebinarDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebinarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

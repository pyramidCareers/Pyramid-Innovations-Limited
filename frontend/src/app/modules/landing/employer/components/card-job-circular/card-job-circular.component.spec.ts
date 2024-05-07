import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardJobCircularComponent } from './card-job-circular.component';

describe('CardJobCircularComponent', () => {
  let component: CardJobCircularComponent;
  let fixture: ComponentFixture<CardJobCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardJobCircularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardJobCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

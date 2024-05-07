import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedRoutingComponent } from './unauthorized-routing.component';

describe('UnauthorizedRoutingComponent', () => {
  let component: UnauthorizedRoutingComponent;
  let fixture: ComponentFixture<UnauthorizedRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthorizedRoutingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthorizedRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

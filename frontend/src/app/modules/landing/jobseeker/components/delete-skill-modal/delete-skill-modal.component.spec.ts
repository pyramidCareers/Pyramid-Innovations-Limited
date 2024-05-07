import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSkillModalComponent } from './delete-skill-modal.component';

describe('DeleteSkillModalComponent', () => {
  let component: DeleteSkillModalComponent;
  let fixture: ComponentFixture<DeleteSkillModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSkillModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSkillModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

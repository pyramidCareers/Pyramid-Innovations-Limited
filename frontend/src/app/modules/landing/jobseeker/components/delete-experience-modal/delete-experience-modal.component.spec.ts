import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExperienceModalComponent } from './delete-experience-modal.component';

describe('DeleteExperienceModalComponent', () => {
    let component: DeleteExperienceModalComponent;
    let fixture: ComponentFixture<DeleteExperienceModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DeleteExperienceModalComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DeleteExperienceModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

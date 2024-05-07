import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchAditionalJobsComponent } from './search-aditional-jobs.component';

describe('SearchAditionalJobsComponent', () => {
    let component: SearchAditionalJobsComponent;
    let fixture: ComponentFixture<SearchAditionalJobsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SearchAditionalJobsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SearchAditionalJobsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

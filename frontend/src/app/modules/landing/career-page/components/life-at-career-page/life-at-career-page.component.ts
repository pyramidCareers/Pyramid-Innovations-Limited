import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-life-at-career-page',
    templateUrl: './life-at-career-page.component.html',
    styleUrls: ['./life-at-career-page.component.scss'],
})
export class LifeAtCareerPageComponent {
    @Input() employer_data;
}

import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-description-career-page',
    templateUrl: './description-career-page.component.html',
    styleUrls: ['./description-career-page.component.scss'],
})
export class DescriptionCareerPageComponent {
    @Input() employer_data;
}

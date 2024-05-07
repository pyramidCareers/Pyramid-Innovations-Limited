import { Component } from '@angular/core';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
    // encapsulation: ViewEncapsulation.None,
})
export class BannerComponent {
    constructor() {}

    searchJobs(value: string) {
        if (value) {
            window.open(`/jobs/search/${value}`);
        }
    }
}

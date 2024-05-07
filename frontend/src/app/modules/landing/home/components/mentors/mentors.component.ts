import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-mentors',
    templateUrl: './mentors.component.html',
    styleUrls: ['./mentors.component.scss'],
    // encapsulation: ViewEncapsulation.None
})
export class MentorsComponent {
    constructor(private _router: Router) {}

    goToCoaches() {
        this._router.navigate(['', 'coaches']);
    }
}

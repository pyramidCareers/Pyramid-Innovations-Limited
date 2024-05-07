import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-partners',
    templateUrl: './partners.component.html',
    styleUrls: ['./partners.component.scss'],
    // encapsulation: ViewEncapsulation.None
})
export class PartnersComponent {
    constructor(private _router: Router) {}

    goToJobs() {
        this._router.navigate(['jobs']);
    }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-advice',
    templateUrl: './advice.component.html',
    styleUrls: ['./advice.component.scss'],
    // encapsulation: ViewEncapsulation.None
})
export class AdviceComponent {
    constructor(private _router: Router) {}

    goToJobs() {
        this._router.navigate(['jobs']);
    }
}

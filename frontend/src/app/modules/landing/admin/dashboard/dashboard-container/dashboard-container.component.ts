import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard-container',
    templateUrl: './dashboard-container.component.html',
    styleUrls: ['./dashboard-container.component.scss'],
})
export class DashboardContainerComponent {
    loading: boolean = false;
}

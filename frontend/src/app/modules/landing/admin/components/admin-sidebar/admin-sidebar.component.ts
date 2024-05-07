import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-admin-sidebar',
    templateUrl: './admin-sidebar.component.html',
    styleUrls: ['./admin-sidebar.component.scss'],
})
export class AdminSidebarComponent {
    activeRouteUrl: string = '/admin/dashboard';

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.activeRouteUrl = event.url;
            }
        });
    }

    isActiveRoute(route: string): boolean {
        return this.activeRouteUrl == route;
    }
}

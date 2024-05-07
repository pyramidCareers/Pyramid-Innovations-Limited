import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-mentor-sidebar',
    templateUrl: './mentor-sidebar.component.html',
    styleUrls: ['./mentor-sidebar.component.scss'],
})
export class MentorSidebarComponent {
    activeRouteUrl: string = '/mentor/28/calendar';

    constructor(private _router: Router) {}

    userTypeAdmin: boolean = false;
    userTypeMentor: boolean = false;
    userTypeJobseeker: boolean = false;
    userId: any = localStorage.getItem('user-id');

    ngOnInit(): void {
        let pathname = window?.location.pathname;
        this.activeRouteUrl = pathname;

        this._router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.activeRouteUrl = event.url;
            }
        });

        if (
            localStorage.getItem('type-code') ===
            environment.jobseeker_type_code
        ) {
            this.userTypeJobseeker = true;
        }
        if (
            localStorage.getItem('type-code') === environment.mentor_type_code
        ) {
            this.userTypeMentor = true;
        }
        if (localStorage.getItem('type-code') === environment.admin_type_code) {
            this.userTypeAdmin = true;
        }
    }

    isActiveRelativeRoute(route: string): boolean {
        return this.activeRouteUrl.includes(route);
    }

    isActiveRoute(route: string): boolean {
        return this.activeRouteUrl == route;
    }

    selectedMenuItem: any;
    navList = [
        {
            name: 'Dashboard',
            icon: 'dashboard',
            id: 1,
            selected: false,
            url: 'dashboard',
        },
        {
            name: 'Profile',
            icon: 'person',
            id: 2,
            selected: false,
            url: 'profile',
        },
        {
            name: 'Resume',
            icon: 'assignment',
            id: 3,
            selected: false,
            url: 'resume-upload',
        },
        {
            name: 'Application List',
            icon: 'list',
            id: 4,
            selected: false,
            url: 'applications',
        },
        {
            name: 'Change Password',
            icon: 'lock',
            id: 6,
            selected: false,
            url: 'change-password',
        },
        {
            name: 'Favourite Jobs',
            icon: 'favorite',
            id: 7,
            selected: false,
            url: 'favorite-jobs',
        },
        {
            name: 'Courses',
            icon: 'library_books',
            id: 8,
            selected: false,
            url: 'my-courses',
        },
        {
            name: 'Career Coaches',
            icon: 'group',
            id: 9,
            selected: false,
            url: 'mentors',
        },
        {
            name: 'Certification Exams',
            icon: 'insert_drive_file',
            id: 10,
            selected: false,
            url: 'certified-exams',
        },
        {
            name: 'Webinars',
            icon: 'class',
            id: 10,
            selected: false,
            url: 'my-webinars',
        },
    ];

    currentMonth: number = new Date().getMonth();
    currentYear: number = new Date().getFullYear();

    goToCalendar() {
        this._router.navigate([
            'mentor',
            localStorage.getItem('user-id'),
            'calendar',
            'month',
            this.currentMonth,
            'year',
            this.currentYear,
        ]);
    }

    gotoURL(url: string) {
        this._router.navigate([`admin/${url}`]);
    }

    goTo(item: any) {
        if (item.name === 'Dashboard')
            this._router.navigate(['jobseeker/dashboard']);
        else if (item.name === 'Profile')
            this._router.navigate([
                'jobseeker',
                localStorage.getItem('user-id'),
                'profile',
            ]);
        else if (item.name === 'Resume')
            this._router.navigate(['jobseeker/profile/resume-upload']);
        else if (item.name === 'Courses')
            this._router.navigate(['jobseeker/my-courses']);
        else if (item.name === 'Mentors')
            this._router.navigate(['jobseeker/mentors']);
        else if (item.name === 'Application List')
            this._router.navigate([
                'jobseeker',
                localStorage.getItem('user-id'),
                'applications',
            ]);
        else if (item.name === 'Resume Templates')
            this._router.navigate(['jobseeker/resume-template']);
        else if (item.name === 'Change Password')
            this._router.navigate(['jobseeker/change-password']);
        else if (item.name === 'Favourite Jobs')
            this._router.navigate([
                'jobseeker',
                localStorage.getItem('user-id'),
                'favorite-jobs',
            ]);
        else if (item.name === 'Certification Exams')
            this._router.navigate(['jobseeker/certified-exams']);
        else if (item.name === 'Webinars')
            this._router.navigate(['jobseeker/my-webinars']);
    }
}

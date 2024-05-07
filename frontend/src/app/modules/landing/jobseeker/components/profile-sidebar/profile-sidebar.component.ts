import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-sidebar',
    templateUrl: './profile-sidebar.component.html',
    styleUrls: ['./profile-sidebar.component.scss'],
})
export class ProfileSidebarComponent {
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
            url: 'certified-exams'
        },
        {
            name: 'Webinars',
            icon: 'class',
            id: 10,
            selected: false,
            url: 'my-webinars'
        },
    ];

    constructor(private _router: Router, private router: Router) {}

    ngOnInit() {
        const url = this.router.url.split('/').pop();
        this.navList = this.navList.map((nav) => ({
            ...nav,
            selected: url.includes(nav.url),
        }));
    }

    goTo(item: any) {
        if (item.name === 'Dashboard')
            this._router.navigate(['jobseeker/dashboard']);
        else if (item.name === 'Profile')
            this._router.navigate(['jobseeker', localStorage.getItem('user-id'), 'profile',]);
        else if (item.name === 'Resume')
            this._router.navigate(['jobseeker/profile/resume-upload']);
        else if (item.name === 'Courses')
            this._router.navigate(['jobseeker/my-courses']);
        else if (item.name === 'Career Coaches')
            this._router.navigate(['jobseeker/mentors']);
        else if (item.name === 'Application List')
            this._router.navigate(['jobseeker', localStorage.getItem('user-id'), 'applications',]);
       
        else if (item.name === 'Change Password')
            this._router.navigate(['jobseeker/change-password']);
        else if (item.name === 'Favourite Jobs')
            this._router.navigate(['jobseeker', localStorage.getItem('user-id'), 'favorite-jobs',]);
        else if (item.name === 'Certification Exams')
            this._router.navigate(['jobseeker/certified-exams']);
        else if( item.name === 'Webinars' )
            this._router.navigate(['jobseeker/my-webinars']);
    }
}

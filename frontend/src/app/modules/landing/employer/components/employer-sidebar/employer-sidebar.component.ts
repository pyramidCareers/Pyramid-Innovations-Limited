import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-employer-sidebar',
    templateUrl: './employer-sidebar.component.html',
    styleUrls: ['./employer-sidebar.component.scss'],
})
export class EmployerSidebarComponent implements OnInit {
    
    typeCode:any;
    userType:any;
    profileUrl:string = '/employer/profile/edit/' + localStorage.getItem('user-id');
    activeRouteUrl: string = '/employer/dashboard';

    constructor(private _router: Router) {}

    ngOnInit() {
        this.typeCode = +localStorage.getItem('type-code');
        if (this.typeCode == +environment.admin_type_code) {
            this.userType = 'admin';
        }
        if (this.typeCode == +environment.employer_type_code) {
            this.userType = 'employer';
        }
        if (this.typeCode == +environment.jobseeker_type_code) {
            this.userType = 'jobseeker';
        }

        this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
              this.activeRouteUrl = event.url;
            }
        });
    }

    isActiveRoute(route: string): boolean {
        return this.activeRouteUrl == route;
    }

    isActiveRelativeRoute(route: string): boolean {
        return this.activeRouteUrl.includes(route);
    }


    goTo() {
        this._router.navigate([
            'employer',
            'profile',
            'edit',
            localStorage.getItem('user-id'),
        ]);
    }
    goToAdminJobs() {
        this._router.navigate(['admin', 'jobs']);
    }
    goToCreateAdmin() {
        this._router.navigate(['admin', 'create-admin']);
    }
    goToCreateMentor() {
        this._router.navigate(['admin', 'create-mentor']);
    }
    goToAdminEmployers() {
        this._router.navigate(['admin', 'employers']);
    }
    goToAdminCVtemplate() {
        this._router.navigate(['admin', 'cv-template']);
    }
    goToAdminJobseekersReport() {
        this._router.navigate(['admin', 'jobseeker-reports']);
    }
    goToAdminDashboard(){
        this._router.navigate(['admin', 'dashboard']);
    }
    goToCareerPage() {
        this._router.navigateByUrl(
            `employer/career-page/${localStorage.getItem('user-id')}/edit`
        );
    }
    goToAdminCVBank(){
        this._router.navigate(['admin', 'cv-bank']);
    }

    goToAdminMentorSession(){
        this._router.navigate(['admin', '/admin/mentor-session']);
    }
}

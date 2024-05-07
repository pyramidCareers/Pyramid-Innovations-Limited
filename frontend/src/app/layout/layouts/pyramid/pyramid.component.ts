import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from 'app/modules/admin/login/services/login.service';
import { EventService } from 'app/shared/services/event.service.service';
import { LogoutService } from 'app/shared/services/logout.service';
import { environment, restrictedSubDomains } from 'environments/environment';
import { Subject } from 'rxjs';

@Component({
    selector: 'pyramid-layout',
    templateUrl: './pyramid.component.html',
    styleUrls: ['./pyramid.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PyramidLayoutComponent implements OnDestroy, OnInit {
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    SubmitForm: UntypedFormGroup;
    showEmailError: boolean = false;
    isLoggedIn: boolean = false;
    isMentor: boolean = false;
    isAdmin: boolean = false;
    isEmployer: boolean = false;
    isJobseeker: boolean = false;
    typeCode: any;
    userType: any;
    currentHover = 'defaultHover';
    currentLogo = 'assets/icons/PIL.png';
    currentBackground = 'defaultBackground';
    userID: any;

    constructor(
        private _router: Router,
        private eventService: EventService,
        private _logoutService: LogoutService,
        private _login: LoginService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        if (localStorage.getItem('auth-token')) {
            this.isLoggedIn = true;
            this.userID = localStorage.getItem('user-id');
            if (
                localStorage.getItem('type-code') ===
                environment.admin_type_code
            ) {
                this.isAdmin = true;
            }
            if (
                localStorage.getItem('type-code') ===
                environment.mentor_type_code
            ) {
                this.isMentor = true;
            }
            if (
                localStorage.getItem('type-code') ===
                environment.jobseeker_type_code
            ) {
                this.isJobseeker = true;
            }
            if (
                localStorage.getItem('type-code') ===
                environment.employer_type_code
            ) {
                this.isEmployer = true;
            }
        }

        this._login.userRole.subscribe((res) => {
            this.isAdmin =
                res === 'admin' ||
                localStorage.getItem('type-code') ===
                    environment.admin_type_code;

            this.isMentor =
                res === 'mentor' ||
                localStorage.getItem('type-code') ===
                    environment.mentor_type_code;
        });

        this.SubmitForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.pattern(
                    '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'
                ),
            ]),
        });

        this.eventService.event$.subscribe((data) => {
            // Handle the event data
            if (data == 1) this.isLoggedIn = true;
            if (data == 0) this.isLoggedIn = false;
            this.cdr.detectChanges();
        });

        const url = this._router.url;
        if (url==='/') {
            this.currentBackground = 'homeBackground';
            this.currentLogo = 'assets/icons/PIL.png';
            this.currentHover = 'homeHover';
        } else if (url.includes('employer')) {
            this.currentBackground = 'employerBackground';
            this.currentLogo = 'assets/icons/career.png';
            this.currentHover = 'employerHover';
        } else if (url.includes('career')) {
            this.currentBackground = 'employerBackground';
            this.currentLogo = 'assets/icons/career.png';
            this.currentHover = 'employerHover';
        } else if (url.includes('jobs')) {
            this.currentBackground = 'jobsBackground';
            this.currentLogo = 'assets/icons/jobs.png';
            this.currentHover = 'jobsHover';
        } else {
            this.currentBackground = 'defaultBackground';
            this.currentLogo = 'assets/icons/PIL.png';
            this.currentHover = 'defaultHover';
        }

        if (localStorage.getItem('auth-token')) {
            this.isLoggedIn = true;
        }

        this._router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const currentRoute = event.url;
                if (currentRoute==='/') {
                    this.currentBackground = 'homeBackground';
                    this.currentLogo = 'assets/icons/PIL.png';
                    this.currentHover = 'homeHover';
                } else if (currentRoute.includes('employer')) {
                    this.currentBackground = 'employerBackground';
                    this.currentLogo = 'assets/icons/career.png';
                    this.currentHover = 'employerHover';
                } else if (currentRoute.includes('career')) {
                    this.currentBackground = 'employerBackground';
                    this.currentLogo = 'assets/icons/career.png';
                    this.currentHover = 'employerHover';
                } else if (currentRoute.includes('jobs')) {
                    this.currentBackground = 'jobsBackground';
                    this.currentLogo = 'assets/icons/jobs.png';
                    this.currentHover = 'jobsHover';
                } else {
                    this.currentBackground = 'defaultBackground';
                    this.currentLogo = 'assets/icons/PIL.png';
                    this.currentHover = 'defaultHover';
                }
            }
        });
    }

    onSubmit() {
        if (this.SubmitForm.valid) {
            const email = this.SubmitForm.value.email;

            // Clear the input field
            this.SubmitForm.reset();

            this.showEmailError = false;
        } else {
            this.showEmailError = true;
        }
    }

    onEmailInput() {
        const emailControl = this.SubmitForm.get('email');
        this.showEmailError = emailControl.invalid && emailControl.value !== '';
    }

    isExpand: boolean = false;
    menuIcon: string = 'heroicons_solid:menu';

    expandMenu() {
        this.isExpand = !this.isExpand;
        if (this.menuIcon === 'heroicons_solid:menu') {
            this.menuIcon = 'heroicons_solid:x';
        } else {
            this.menuIcon = 'heroicons_solid:menu';
        }
    }

    currentMonth: number = new Date().getMonth();
    currentYear: number = new Date().getFullYear();

    goToProfileEditPage() {
        this.userID = localStorage.getItem('user-id');
        if (localStorage.getItem('type-code') == environment.admin_type_code) {
            this._router.navigate(['admin', 'dashboard']);
        }
        if (localStorage.getItem('type-code') == environment.mentor_type_code) {
            this._router.navigate(['mentor', this.userID, 'dashboard']);
        }
        if (
            localStorage.getItem('type-code') == environment.employer_type_code
        ) {
            this._router.navigate(['employer', 'profile', 'edit', this.userID]);
        }
        if (
            localStorage.getItem('type-code') == environment.jobseeker_type_code
        ) {
            this._router.navigate([
                'jobseeker',
                localStorage.getItem('user-id'),
                'profile',
            ]);
        }
    }

    goToButton() {
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
        if (this.typeCode === 0) {
            this._router.navigate(['unauthorized-access']);
        }
        if (this.userType == 'admin') {
            this._router.navigate(['unauthorized-access']);
        }
        if (this.userType == 'jobseeker') {
            this._router.navigate(['unauthorized-access']);
        }
        if (this.userType == 'employer') {
            this._router.navigate(['employer', 'dashboard']);
        }
    }

    goToLink(link) {
        this._router.navigate([link]);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    goTo(path: string) {
        this._router.navigate([path]);
    }

    logout() {
        this._logoutService.logout();
    }

    goToDashBoard() {
        if (localStorage.getItem('type-code') == environment.employer_type_code)
            this._router.navigate(['employer', 'dashboard']);
        if (
            localStorage.getItem('type-code') == environment.jobseeker_type_code
        )
            this._router.navigate(['jobseeker', 'dashboard']);
    }

    getSubdomainFromHostname(): string {
        let hostname = window.location.host;
        const parts = hostname.split('.');
        if (
            parts.length >= 3
        ) {
            const subdomain = parts[0].toLowerCase()==='www'? parts[1].toLowerCase(): parts[0].toLowerCase();
            return subdomain;
        }
        return '';
    }

    navigateToHome(){
        // if subdomain exists,and it is not restricted to use, then navigate to main domain page by loading entire page
        const subdomain=this.getSubdomainFromHostname();
        if(subdomain && !restrictedSubDomains.includes(subdomain))
        {
            window.location.href = window.location.protocol + '//pyramid.careers';
        }
        // else navigate to home page
        else{
            this._router.navigate(['']);
        }
    }
}

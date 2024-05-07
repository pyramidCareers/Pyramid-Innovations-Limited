import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { EventService } from 'app/shared/services/event.service.service';
import { environment } from 'environments/environment';
import { LoginService } from '../services/login.service';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss'],
    animations: fuseAnimations,
})
export class UserLoginComponent {
    password: string = '';
    email: string = '';
    showPassword: boolean = false;
    showAlert: boolean = false;
    loading: boolean = false;
    errorMessage: string = '';

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: 'Wrong username or password',
    };

    constructor(
        private _router: Router,
        private _acr: ActivatedRoute,
        private loginApi: LoginService,
        private eventService: EventService
    ) {}

    params: string[] = [];

    redirectUrl = '';

    ngOnInit() {
        this._acr.queryParams.subscribe((res) => {
            for (let param of Object.keys(res)) {
                this.redirectUrl += `${res[param]}/`;
            }
        });
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    redirectToOAuthURL(url: any) {
        this.loginApi.getOAuthURL(url).subscribe((res: any) => {
            if (res.status && res.status == true) {
                if (res.data) {
                    window.location.replace(res.data);
                }
            }
        });
    }

    submit() {
        this.showAlert = false;
        this.loading = true;

        this.loginApi.login(this.email, this.password).subscribe(
            (response: any) => {
                this.loading = false;
                if (response.user) {
                    let user: any = response.user;

                    if (user.email) {
                        localStorage.setItem('user-email', user.email);
                    }

                    if (user.user_type) {
                        if (
                            user.user_type == 'jobseeker' ||
                            user.user_type == 'jobSeeker'
                        ) {
                            this.loginApi.userRole.next('jobseeker');
                            localStorage.setItem(
                                'type-code',
                                environment.jobseeker_type_code
                            );
                        }
                        if (
                            user.user_type == 'admin' ||
                            user.user_type == 'admin'
                        ) {
                            this.loginApi.userRole.next('admin');
                            localStorage.setItem(
                                'type-code',
                                environment.admin_type_code
                            );
                        }
                        if (
                            user.user_type == 'mentor' ||
                            user.user_type == 'Mentor'
                        ) {
                            this.loginApi.userRole.next('mentor');
                            localStorage.setItem(
                                'type-code',
                                environment.mentor_type_code
                            );
                        } else if (user.user_type == 'employer') {
                            this.loginApi.userRole.next('employer');
                            localStorage.setItem(
                                'type-code',
                                environment.employer_type_code
                            );
                        }
                    }
                    if (user.moodle_auth_token) {
                        localStorage.setItem(
                            'moodle-token',
                            user.moodle_auth_token
                        );
                    }
                    if (user.firstname) {
                        localStorage.setItem('firstname', user.firstname);
                    }
                    if (user.lastname) {
                        localStorage.setItem('lastname', user.lastname);
                    }
                    if (user.id) {
                        localStorage.setItem('user-id', user.id);
                    }
                }
                if (response.token) {
                    localStorage.setItem('auth-token', response.token);
                    this.triggerEvent();
                    if (this.redirectUrl !== '') {
                        this.redirectUrl = this.redirectUrl.slice(0, -1);

                        this._router.navigateByUrl(this.redirectUrl);
                        return;
                    } else if (
                        localStorage.getItem('type-code') ==
                        environment.employer_type_code
                    ) {
                        if (response?.user?.force_password_change) {
                            this._router.navigate([
                                `employer/change-password/${response?.user?.force_password_change}`,
                            ]);
                            return;
                        }
                        this._router.navigate(['employer/dashboard']);
                    } else {
                        this._router.navigate(['']);
                    }
                }
            },
            (error: any) => {
                if (error.status >= 400) {
                    this.loading = false;
                    this.errorMessage = error.error.message;
                    this.showAlert = true;
                }
            }
        );
    }

    goTo(path: string) {
        this._router.navigate([path]);
    }

    triggerEvent() {
        this.eventService.triggerEvent(1);
    }

    resetPass() {
        this._router.navigate(['user/forget-password']);
    }
}

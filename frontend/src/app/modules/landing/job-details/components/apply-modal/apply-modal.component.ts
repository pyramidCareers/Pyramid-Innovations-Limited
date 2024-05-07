import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/modules/admin/registration/models/user';
import { RegistrationService } from 'app/modules/admin/registration/services/registration.service';
import { JobsService } from 'app/modules/landing/jobs/services/jobs.service';
import { EventService } from 'app/shared/services/event.service.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-apply-modal',
    templateUrl: './apply-modal.component.html',
    styleUrls: ['./apply-modal.component.scss'],
})
export class ApplyModalComponent {
    constructor(
        public dialogRef: MatDialogRef<ApplyModalComponent>,
        private formBuilder: FormBuilder,
        private _router: Router,
        private registerApi: RegistrationService,
        private eventService: EventService,
        private jobDetails: JobsService,
        private route: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    emitValue() {
        const value = 'Applied';
        this.onClose(value);
    }

    onClose(value: string): void {
        this.dialogRef.close(value);
    }

    userId;
    user: User = {} as User;
    showPassword: boolean = false;
    showConfirmPassword: boolean = false;
    duplicateMail: boolean = false;
    loading: boolean = false;
    formInfo: FormGroup;

    ngOnInit() {
        this.formInfo = this.formBuilder.group(
            {
                firstname: ['', [Validators.required]],
                lastname: ['', [Validators.required]],
                email: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.pattern(
                            '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
                        ),
                    ]),
                ],
                phone: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.minLength(11),
                    ]),
                ],
                userType: [''],
                password: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.minLength(8),
                        Validators.pattern(
                            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{7,}$'
                        ),
                    ]),
                ],
                confirmPassword: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.minLength(8),
                    ]),
                ],
            },
            { validator: this.matchPassword }
        );
    }

    fillUserData() {
        this.user.firstname = this.formInfo.get('firstname').value;
        this.user.lastname = this.formInfo.get('lastname').value;
        this.user.email = this.formInfo.get('email').value;
        this.user.phone = this.formInfo.get('phone').value;
        this.user.password = this.formInfo.get('password').value;
        this.user.password_confirmation =
            this.formInfo.get('confirmPassword').value;
        this.user.user_type = 'jobseeker';
    }

    triggerEvent() {
        this.eventService.triggerEvent(1);
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    toggleConfirmPasswordVisibility() {
        this.showConfirmPassword = !this.showConfirmPassword;
    }

    matchPassword(control: FormGroup) {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        if (password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ matchPassword: true });
        } else {
            confirmPassword.setErrors(null);
        }
    }

    onSubmit() {
        this.duplicateMail = false;
        this.loading = true;

        this.fillUserData();

        this.registerApi.register(this.user).subscribe(
            (response: any) => {
                if (response.token) {
                    //token exists
                    localStorage.setItem('auth-token', response.token);
                    this.triggerEvent();
                }

                if (response.user) {
                    let user: any = response.user;
                    if (user.user_type) {
                        if (user.firstname) {
                            localStorage.setItem('firstname', user.firstname);
                        }
                        if (
                            user.user_type == 'jobseeker' ||
                            user.user_type == 'jobSeeker'
                        ) {
                            localStorage.setItem(
                                'type-code',
                                environment.jobseeker_type_code
                            );
                        } else if (user.user_type == 'employer') {
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

                    if (user.id) {
                        localStorage.setItem('user-id', user.id);
                        this.userId = user.id;
                        this.jobDetails
                            .applyJob(this.userId, this.data.jobId)
                            .subscribe(
                                (res: any) => {
                                    this.loading = false;
                                    this.emitValue();
                                },
                                (error) => {
                                    console.log(
                                        'Error fetching all jobs:',
                                        error
                                    );
                                }
                            );
                    }
                }

                // Handle the successful response
            },
            (error: any) => {
                if (error.status >= 400) {
                    this.loading = false;

                    if (
                        error.error.message ==
                        'The email has already been taken.'
                    ) {
                        this.duplicateMail = true;
                    }
                } else {
                    // this.loading = false;
                }
            }
        );
    }

    goTo() {
        this._router.navigateByUrl(
            `user/login?route=jobs&id=${this.data.jobId}`
        );
        this.dialogRef.close();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

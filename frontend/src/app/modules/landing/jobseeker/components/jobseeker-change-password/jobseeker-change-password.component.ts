import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SettingNewPasswordService } from 'app/modules/admin/services/setting-new-password.service';
import { ModalErrorComponent } from 'app/modules/landing/employer/components/modal-error/modal-error.component';
import { JobseekerChangePassSuccesfullModalComponent } from '../jobseeker-change-pass-succesfull-modal/jobseeker-change-pass-succesfull-modal.component';

@Component({
    selector: 'app-jobseeker-change-password',
    templateUrl: './jobseeker-change-password.component.html',
    styleUrls: ['./jobseeker-change-password.component.scss'],
})
export class JobseekerChangePasswordComponent {
    email: string = '';
    formInfo: FormGroup;
    loading: boolean = false;
    showPassword: boolean = false;
    showNewPassword: boolean = false;

    constructor(
        private _router: Router,
        private dialog: MatDialog,
        private formBuilder: FormBuilder,
        private setPasswordApi: SettingNewPasswordService
    ) {}

    ngOnInit() {
        this.formInfo = this.formBuilder.group(
            {
                email: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.pattern(
                            '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
                        ),
                    ]),
                ],
                existing_password: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.minLength(8),
                        Validators.pattern(
                            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{7,}$'
                        ),
                    ]),
                ],
                new_password: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.minLength(8),
                        Validators.pattern(
                            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{7,}$'
                        ),
                    ]),
                ],
            },
            { validator: this.matchPassword }
        );
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    toggleNewPasswordVisibility() {
        this.showNewPassword = !this.showNewPassword;
    }

    matchPassword(control: FormGroup) {
        const existing_password = control.get('existing_password');
        const new_password = control.get('new_password');

        if (existing_password.value === new_password.value) {
            new_password.setErrors({ matchPassword: true });
        } else {
            new_password.setErrors(null);
        }
    }

    onSubmit() {
        this.loading = true;

        this.setPasswordApi
            .ChangePassword(
                this.formInfo.get('email').value,
                this.formInfo.get('existing_password').value,
                this.formInfo.get('new_password').value
            )
            .subscribe(
                (res: any) => {
                    this.loading = false;
                    if (res.message) {
                        if (res.message == 'Password Reset Successful') {
                            const dialogRef = this.dialog.open(
                                JobseekerChangePassSuccesfullModalComponent
                            );
                        }
                        // Clear the input field
                        this.formInfo.reset();
                    }
                    this.loading = false;
                },
                (err: any) => {
                    if (err.error.message !== 'Password Reset Successful') {
                        const dialogRef = this.dialog.open(ModalErrorComponent);
                    }
                    this.loading = false;
                }
            );
    }
}

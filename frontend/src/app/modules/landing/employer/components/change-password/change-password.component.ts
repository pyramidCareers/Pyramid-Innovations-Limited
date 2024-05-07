import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SettingNewPasswordService } from 'app/modules/admin/services/setting-new-password.service';
import { environment } from 'environments/environment';
import { ModalChangePasswordSuccesfullyComponent } from '../modal-change-password-succesfully/modal-change-password-succesfully.component';
import { ModalErrorComponent } from '../modal-error/modal-error.component';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
    email: string = '';
    formInfo: FormGroup;
    loading: boolean = false;
    showPassword: boolean = false;
    showNewPassword: boolean = false;

    constructor(
        private _router: Router,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private setPasswordApi: SettingNewPasswordService
    ) {}

    statusId: any;
    titleText: string = '';

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.statusId = +params.get('id');
        });
        if (this.statusId === 1) {
            localStorage.setItem('force-change-pass-code', '9365');
            this.titleText = 'You must need to change your current password';
        } else {
            this.titleText = 'Change Password';
        }

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
                    if (this.statusId === 1) {
                        this.setPasswordApi
                            .updateUser(localStorage.getItem('user-id'))
                            .subscribe((response: any) => {
                                if (
                                    response.message ===
                                    'User updated successfully.'
                                ) {
                                    localStorage.setItem(
                                        'force-change-pass-code',
                                        environment.force_change_password_code
                                    );
                                    this._router.navigate([
                                        'employer',
                                        'profile',
                                        'edit',
                                        localStorage.getItem('user-id'),
                                    ]);
                                }
                            });
                    }
                    if (res.message) {
                        if (res.message == 'Password Reset Successful') {
                            if (this.statusId !== 1) {
                                const dialogRef = this.dialog.open(
                                    ModalChangePasswordSuccesfullyComponent
                                );
                            }
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

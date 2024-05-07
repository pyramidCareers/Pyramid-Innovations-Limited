import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'app/modules/admin/registration/models/user';
import { EventService } from 'app/shared/services/event.service.service';
import { AdminService } from '../../services/create-employee.service';

@Component({
    selector: 'app-create-employee-modal',
    templateUrl: './create-employee-modal.component.html',
    styleUrls: ['./create-employee-modal.component.scss'],
})
export class CreateEmployeeModalComponent {
    constructor(
        public dialogRef: MatDialogRef<CreateEmployeeModalComponent>,
        private formBuilder: FormBuilder,
        private _createEmployer: AdminService,
        private eventService: EventService,
        private _router: Router
    ) {}

    onClose(value: string): void {
        this.dialogRef.close(value);
    }

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
        this.user.user_type = 'employer';
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

        this._createEmployer
            .createEmployer(this.user)
            .subscribe((response: any) => {
                if (response.token) {
                    // localStorage.setItem('auth-token', response.token);
                    this.triggerEvent();
                }

                if (response.user) {
                    let user: any = response.user;

                    this._router.navigate([`employer/profile/edit/${user.id}`]);

                    this.dialogRef.close();
                }

                // Handle the successful response
                if (response.status >= 400) {
                    this.loading = false;
                    if (
                        response.error.message ==
                        'The email has already been taken.'
                    ) {
                        this.duplicateMail = true;
                    }
                } else {
                    this.loading = false;
                }
            });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

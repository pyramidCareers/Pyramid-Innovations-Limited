import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'app/modules/admin/registration/models/user';
import { EventService } from 'app/shared/services/event.service.service';
import { CreateMentorService } from '../../services/create-mentor.service';
import { CreateMentorSuccessModalComponent } from '../create-mentor-success-modal/create-mentor-success-modal.component';

@Component({
    selector: 'app-create-mentor-modal',
    templateUrl: './create-mentor-modal.component.html',
    styleUrls: ['./create-mentor-modal.component.scss'],
})
export class CreateMentorModalComponent {
    constructor(
        public dialogRef: MatDialogRef<CreateMentorModalComponent>,
        private formBuilder: FormBuilder,
        private eventService: EventService,
        private createMentorAPI: CreateMentorService,
        private _router: Router,
        private dialog: MatDialog
    ) {}

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
                gender: ['', [Validators.required]],
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
        this.user.gender = this.formInfo.get('gender').value;
        this.user.password = this.formInfo.get('password').value;
        this.user.password_confirmation =
            this.formInfo.get('confirmPassword').value;
        this.user.user_type = 'employer';
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

    triggerEvent() {
        this.eventService.triggerEvent(1);
    }

    onSubmit() {
        this.duplicateMail = false;
        this.loading = true;

        this.fillUserData();

        this.createMentorAPI
            .createMentor(this.user)
            .subscribe((response: any) => {
                if (response.token) {
                    // localStorage.setItem('auth-token', response.token);
                    this.triggerEvent();
                }

                if (response.user) {
                    let user: any = response.user;

                    // this._router.navigate([`admin/create-mentor`]);
                    const dialogRef = this.dialog.open(
                        CreateMentorSuccessModalComponent
                    );
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

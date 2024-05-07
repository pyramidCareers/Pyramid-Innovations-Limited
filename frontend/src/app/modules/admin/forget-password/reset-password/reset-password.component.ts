import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'app/shared/services/event.service.service';
import { SettingNewPasswordService } from '../../services/setting-new-password.service';
import { VerifyTokenService } from '../../services/verify-token.service';
import { SuccessModalComponent } from '../success-modal/success-modal.component';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
    showPassword: boolean = false;
    showConfirmPassword: boolean = false;
    token: string = '';
    email: string = '';
    loading: boolean = false;

    verifiedToken: boolean = false;
    expiredToken: boolean = false;
    invalidToken: boolean = false;

    formInfo: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private _router: Router,
        private route: ActivatedRoute,
        private verifyTokenApi: VerifyTokenService,
        private eventService: EventService,
        private dialog: MatDialog,
        private setPasswordApi: SettingNewPasswordService
    ) {}

    ngOnInit() {
        this.formInfo = this.formBuilder.group(
            {
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

        this.token = this.route.snapshot.params['token'];
        this.verifyTokenApi.verifyToken(this.token).subscribe((res: any) => {
            if (res.email) {
                this.email = res.email;
            }
            if (res.message) {
                if (res.message == 'Token Varified') {
                    this.verifiedToken = true;
                } else if (res.message == 'Token Expired! Please Try Again.') {
                    this.expiredToken = true;
                } else if (res.message == 'Token not found!') {
                    this.invalidToken = true;
                }
            }
        });
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
        this.loading = true;

        this.setPasswordApi
            .setPassword(this.email, this.formInfo.get('password').value)
            .subscribe((res: any) => {
                this.loading = false;
                if (res.message) {
                    if (res.message == 'Password Reset Successful') {
                        const dialogRef = this.dialog.open(
                            SuccessModalComponent
                        );
                        // setTimeout(  ()=>{
                        //     dialogRef.close();
                        //     this._router.navigate(['user/login']);
                        // }, 1500)
                    }
                }
            });
    }

    goTo(path: string) {
        this._router.navigate([path]);
    }
}

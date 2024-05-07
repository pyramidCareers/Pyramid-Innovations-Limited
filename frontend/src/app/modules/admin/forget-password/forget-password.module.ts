import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { EmailInputComponent } from './email-input/email-input.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MatIconModule } from '@angular/material/icon';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    EmailInputComponent,
    ResetPasswordComponent,
    SuccessModalComponent
  ],
  imports: [
    CommonModule,
    ForgetPasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule
  ]
})
export class ForgetPasswordModule { }

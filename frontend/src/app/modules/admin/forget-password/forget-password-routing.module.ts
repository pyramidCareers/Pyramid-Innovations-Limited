import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailInputComponent } from './email-input/email-input.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
    {
      path: 'forget-password',
      component: EmailInputComponent
    },
    {
      path: 'forget-password/:token',
      component: ResetPasswordComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgetPasswordRoutingModule { }

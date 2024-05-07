import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { SsoLoginRoutingModule } from './sso-login-routing.module';
import { SsoLoginComponent } from './sso-login/sso-login.component';
import { ErrorLoginModalComponent } from './error-modal/error-modal.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    SsoLoginComponent,
    ErrorLoginModalComponent
  ],
  imports: [
    CommonModule,
    SsoLoginRoutingModule,
    SharedModule,
     MatDialogModule
  ]
})
export class SsoLoginModule { }

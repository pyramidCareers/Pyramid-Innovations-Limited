import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LoginRoutingModule } from './login-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    UserLoginComponent,

  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    MatIconModule,
    SharedModule
  ]
})
export class LoginModule { }

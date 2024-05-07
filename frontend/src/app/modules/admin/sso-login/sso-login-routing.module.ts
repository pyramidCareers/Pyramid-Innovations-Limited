import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SsoLoginComponent } from './sso-login/sso-login.component';

const routes: Routes = [
  {
    path: '',
    component:  SsoLoginComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SsoLoginRoutingModule { }

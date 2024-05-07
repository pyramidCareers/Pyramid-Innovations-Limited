import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OauthRoutingModule } from './oauth-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { OauthComponent } from './components/oauth/oauth.component';


@NgModule({
  declarations: [
    OauthComponent
  ],
  imports: [
    CommonModule,
    OauthRoutingModule,
    SharedModule
  ]
})
export class OauthModule { }

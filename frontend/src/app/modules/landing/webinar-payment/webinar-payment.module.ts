import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebinarPaymentRoutingModule } from './webinar-payment-routing.module';
import { WebinarPaymentStatusComponent } from './components/webinar-payment-status/webinar-payment-status.component';


@NgModule({
  declarations: [
    WebinarPaymentStatusComponent
  ],
  imports: [
    CommonModule,
    WebinarPaymentRoutingModule
  ]
})
export class WebinarPaymentModule { }

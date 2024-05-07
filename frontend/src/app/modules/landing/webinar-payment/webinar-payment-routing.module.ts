import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebinarPaymentStatusComponent } from './components/webinar-payment-status/webinar-payment-status.component';

const routes: Routes = [
  {
    path: '',
    component: WebinarPaymentStatusComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebinarPaymentRoutingModule { }

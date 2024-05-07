import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentStatusComponent } from './components/payment-status/payment-status.component';

const routes: Routes = [
    {
      path: '',
      component: PaymentStatusComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RefundPolicyRoutingModule } from './refund-policy-routing.module';
import { RefundPolicyComponent } from './refund-policy.component';

@NgModule({
    declarations: [RefundPolicyComponent],
    imports: [CommonModule, SharedModule, RefundPolicyRoutingModule],
})
export class RefundPolicyModule {}

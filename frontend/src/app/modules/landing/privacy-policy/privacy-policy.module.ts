import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';
import { PrivacyPolicyComponent } from './privacy-policy.component';

@NgModule({
    declarations: [PrivacyPolicyComponent],
    imports: [CommonModule, SharedModule, PrivacyPolicyRoutingModule],
})
export class PrivacyPolicyModule {}

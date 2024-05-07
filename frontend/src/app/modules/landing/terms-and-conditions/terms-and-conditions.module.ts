import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TermsAndConditionsRoutingModule } from './terms-and-conditions-routing.module';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';

@NgModule({
    declarations: [TermsAndConditionsComponent],
    imports: [CommonModule, SharedModule, TermsAndConditionsRoutingModule],
})
export class TermsAndConditionsModule {}

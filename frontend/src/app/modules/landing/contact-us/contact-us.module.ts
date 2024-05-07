import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';

@NgModule({
    declarations: [ContactUsComponent],
    imports: [CommonModule, SharedModule, ContactUsRoutingModule],
})
export class ContactUsModule {}

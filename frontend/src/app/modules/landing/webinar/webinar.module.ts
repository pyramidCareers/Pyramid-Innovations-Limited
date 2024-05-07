import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebinarRoutingModule } from './webinar-routing.module';
import { WebinarContainerComponent } from './components/webinar-container/webinar-container.component';
import { LoaderModule } from 'app/shared/components/loader/loader.module';
import { WebinarDetailsComponent } from './components/webinar-details/webinar-details.component';

@NgModule({
  declarations: [
    WebinarContainerComponent,
    WebinarDetailsComponent
  ],
  imports: [
    CommonModule,
    WebinarRoutingModule,
    LoaderModule
  ]
})
export class WebinarModule { }

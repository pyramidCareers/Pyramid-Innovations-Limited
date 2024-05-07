import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebinarContainerComponent } from './components/webinar-container/webinar-container.component';
import { WebinarDetailsComponent } from './components/webinar-details/webinar-details.component';

const routes: Routes = [
      {
        path: ':id/meeting',
        component: WebinarContainerComponent,
      },
      {
        path: ':id/details',
        component: WebinarDetailsComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebinarRoutingModule { }

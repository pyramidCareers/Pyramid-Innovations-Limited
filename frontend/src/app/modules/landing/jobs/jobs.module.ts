import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobsComponent } from './jobs.component';
import { JobsRoutes } from './jobs.routing';
import { ApplyModalJobListComponent } from './components/apply-modal-job-list/apply-modal-job-list.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
    declarations: [JobsComponent, JobListComponent, ApplyModalJobListComponent],
    imports: [
        RouterModule.forChild(JobsRoutes),
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatGridListModule,
        CdkAccordionModule,
        MatRadioModule,
        FormsModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        NgxSliderModule
    ],
})
export class JobsModule {}

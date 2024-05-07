import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { SearchAditionalJobsComponent } from './components/search-aditional-jobs/search-aditional-jobs.component';
import { SimilarJobsComponent } from './components/similar-jobs/similar-jobs.component';
import { SuggestedSearchesComponent } from './components/suggested-searches/suggested-searches.component';
import { JobDetailsComponent } from './job-details.component';
import { JobDetailsRoutes } from './job-details.routing';
import { ApplyModalComponent } from './components/apply-modal/apply-modal.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CreatePetComponent } from './components/create-pet/create-pet.component';
import { EditPetComponent } from './components/edit-pet/edit-pet.component';
import { SuccessCreatePetComponent } from './components/success-create-pet/success-create-pet.component';
import { DeletePetComponent } from './components/delete-pet/delete-pet.component';
import { SuccessEditPetComponent } from './components/success-edit-pet/success-edit-pet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { ErrorCreatePetComponent } from './components/error-create-pet/error-create-pet.component';
import { DeleteApplyFeeComponent } from './components/delete-apply-fee/delete-apply-fee.component';
import { AddApplyFeeComponent } from './components/add-apply-fee/add-apply-fee.component';
import { EditApplyFeeComponent } from './components/edit-apply-fee/edit-apply-fee.component';
import { UnlockModalComponent } from './components/unlock-modal/unlock-modal.component';
import { JobReadyModalComponent } from './components/job-ready-modal/job-ready-modal.component';
import { JobReadyComponent } from './components/job-ready/job-ready.component';
import { JobReadyCoursesComponent } from './components/job-ready-courses/job-ready-courses.component';
import { DeleteJobReadyCourseComponent } from './components/delete-job-ready-course/delete-job-ready-course.component';
import { DeleteJobReadyProgrammeComponent } from './components/delete-job-ready-programme/delete-job-ready-programme.component';
@NgModule({
    declarations: [
        JobDetailsComponent,
        SimilarJobsComponent,
        SuggestedSearchesComponent,
        SearchAditionalJobsComponent,
        ApplyModalComponent,
        CourseListComponent,
        CreatePetComponent,
        EditPetComponent,
        SuccessCreatePetComponent,
        DeletePetComponent,
        SuccessEditPetComponent,
        CourseItemComponent,
        ErrorCreatePetComponent,
        DeleteApplyFeeComponent,
        AddApplyFeeComponent,
        EditApplyFeeComponent,
        UnlockModalComponent,
        JobReadyModalComponent,
        JobReadyComponent,
        JobReadyCoursesComponent,
        DeleteJobReadyCourseComponent,
        DeleteJobReadyProgrammeComponent,
    ],
    imports: [
        RouterModule.forChild(JobDetailsRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
      
        MatFormFieldModule,
        NgxMatSelectSearchModule
    ],
})
export class JobDetailsModule {}

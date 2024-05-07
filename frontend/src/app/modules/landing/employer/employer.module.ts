import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'app/shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { ApplicantsComponent } from './components/applicants/applicants.component';
import { CardJobCircularComponent } from './components/card-job-circular/card-job-circular.component';
import { CreateJobCircularComponent } from './components/create-job-circular/create-job-circular.component';
import { EditJobCircularComponent } from './components/edit-job-circular/edit-job-circular.component';
import { EmployerDashboardComponent } from './components/employer-dashboard/employer-dashboard.component';
import { ModalCreateJobComponent } from './components/modal-create-job/modal-create-job.component';
import { ModalEditJobComponent } from './components/modal-edit-job/modal-edit-job.component';
import { ModalErrorComponent } from './components/modal-error/modal-error.component';
import { ModalPostJobComponent } from './components/modal-post-job/modal-post-job.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { EmployerModuleRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './employer.component';
import { EmployerSidebarComponent } from './components/employer-sidebar/employer-sidebar.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ModalChangePasswordSuccesfullyComponent } from './components/modal-change-password-succesfully/modal-change-password-succesfully.component';
import { ModalAdminEditEmployerComponent } from './components/modal-admin-edit-employer/modal-admin-edit-employer.component';
import { ModalEmployersEditEmployerComponent } from './components/modal-employers-edit-employer/modal-employers-edit-employer.component';
import { CvBankComponent } from './components/cv-bank/cv-bank.component';
import { JobReadyConfirmationComponent } from './components/job-ready-confirmation/job-ready-confirmation.component';
import { DashboardContainerComponent } from './dashboard/dashboard-container/dashboard-container.component';
import { StatisticsComponent } from './dashboard/statistics/statistics.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';


const material = [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
];

@NgModule({
    declarations: [
        CreateJobCircularComponent,
        EmployerDashboardComponent,
        EditJobCircularComponent,
        ApplicantsComponent,
        ProfileEditComponent,
        CardJobCircularComponent,
        ModalPostJobComponent,
        ModalEditJobComponent,
        ModalErrorComponent,
        ModalCreateJobComponent,
        EmployerComponent,
        EmployerSidebarComponent,
        ChangePasswordComponent,
        ModalChangePasswordSuccesfullyComponent,
        ModalAdminEditEmployerComponent,
        ModalEmployersEditEmployerComponent,
        CvBankComponent,
        JobReadyConfirmationComponent,
        DashboardContainerComponent,
        StatisticsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        EmployerModuleRoutingModule,
        ReactiveFormsModule,
        material,
        QuillModule.forRoot(),
        MatButtonToggleModule,
        MatRadioModule,
        MatCheckboxModule
    ],
    providers: [],
})
export class EmployerModule {}

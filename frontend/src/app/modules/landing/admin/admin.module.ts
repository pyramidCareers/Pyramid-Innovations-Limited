import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminRoutes } from './admin.routing';
import { AddCvModalComponent } from './components/add-cv-modal/add-cv-modal.component';
import { AddCvReqComponent } from './components/add-cv-req/add-cv-req.component';
import { AdminEmployersComponent } from './components/admin-employers/admin-employers.component';
import { AdminJobsComponent } from './components/admin-jobs/admin-jobs.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { CreateAdminModalComponent } from './components/create-admin-modal/create-admin-modal.component';
import { CreateAdminSuccessModalComponent } from './components/create-admin-success-modal/create-admin-success-modal.component';
import { CreateAdminComponent } from './components/create-admin/create-admin.component';
import { CreateEmployeeModalComponent } from './components/create-employee-modal/create-employee-modal.component';
import { CreateMentorModalComponent } from './components/create-mentor-modal/create-mentor-modal.component';
import { CreateMentorSuccessModalComponent } from './components/create-mentor-success-modal/create-mentor-success-modal.component';
import { CreateMentorComponent } from './components/create-mentor/create-mentor.component';
import { CvBankComponent } from './components/cv-bank/cv-bank.component';
import { CvTemplateComponent } from './components/cv-template/cv-template.component';
import { DeleteCvModalComponent } from './components/delete-cv-modal/delete-cv-modal.component';
import { EditAdminSuccessModalComponent } from './components/edit-admin-success-modal/edit-admin-success-modal.component';
import { EditAdminComponent } from './components/edit-admin/edit-admin.component';
import { EditCvModalComponent } from './components/edit-cv-modal/edit-cv-modal.component';
import { EditCvReqComponent } from './components/edit-cv-req/edit-cv-req.component';
import { EditMentorSuccessModalComponent } from './components/edit-mentor-success-modal/edit-mentor-success-modal.component';
import { EditMentorComponent } from './components/edit-mentor/edit-mentor.component';
import { JobseekerReportComponent } from './components/jobseeker-report/jobseeker-report.component';
import { MentorSessionComponent } from './components/mentor-session/mentor-session.component';
import { EmployerDeleteConfirmationModalComponent } from './components/modals/employer-delete-confirmation-modal/employer-delete-confirmation-modal.component';
import { EmployerEditSuccesfullModalComponent } from './components/modals/employer-edit-succesfull-modal/employer-edit-succesfull-modal.component';
import { JobCreateConfirmationModalComponent } from './components/modals/job-create-confirmation-modal/job-create-confirmation-modal.component';
import { JobDeleteConfirmationModalComponent } from './components/modals/job-delete-confirmation-modal/job-delete-confirmation-modal.component';
import { ResumeNotFoundComponent } from './components/modals/resume-not-found/resume-not-found.component';
import { SeriesDetailsComponent } from './components/series-details/series-details.component';
import { DashboardContainerComponent } from './dashboard/dashboard-container/dashboard-container.component';
import { StatisticsComponent } from './dashboard/statistics/statistics.component';
import { MentorProfileUpdateReqComponent } from './components/mentor-profile-update-req/mentor-profile-update-req.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import { CertExamComponent } from './components/cert-exam/cert-exam.component';
import { AdminCourseItemComponent } from './components/admin-course-item/admin-course-item.component';

@NgModule({
    declarations: [
        AdminSidebarComponent,
        AdminEmployersComponent,
        AdminJobsComponent,
        AdminComponent,
        CreateEmployeeModalComponent,
        EmployerEditSuccesfullModalComponent,
        CvTemplateComponent,
        DeleteCvModalComponent,
        AddCvModalComponent,
        EditCvModalComponent,
        EmployerDeleteConfirmationModalComponent,
        JobDeleteConfirmationModalComponent,
        JobCreateConfirmationModalComponent,
        JobseekerReportComponent,
        ResumeNotFoundComponent,
        CreateAdminComponent,
        CreateMentorComponent,
        EditAdminComponent,
        EditMentorComponent,
        EditAdminSuccessModalComponent,
        EditMentorSuccessModalComponent,
        CreateAdminModalComponent,
        CreateAdminSuccessModalComponent,
        CreateMentorModalComponent,
        CreateMentorSuccessModalComponent,
        CvBankComponent,
        AddCvReqComponent,
        EditCvReqComponent,
        MentorSessionComponent,
        SeriesDetailsComponent,
        DashboardContainerComponent,
        StatisticsComponent,
        MentorProfileUpdateReqComponent,
        CertExamComponent,
        AdminCourseItemComponent,
     
        
    ],
    imports: [
        CommonModule,
        MatIconModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        MatSelectModule,
        RouterModule.forChild(AdminRoutes),
        MatButtonToggleModule,
        MatRadioModule,
        MatChipsModule
    ],
})
export class AdminModule {}

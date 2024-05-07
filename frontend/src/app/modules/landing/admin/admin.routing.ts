import { Route } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminEmployersComponent } from './components/admin-employers/admin-employers.component';
import { AdminJobsComponent } from './components/admin-jobs/admin-jobs.component';
import { CreateAdminComponent } from './components/create-admin/create-admin.component';
import { CreateMentorComponent } from './components/create-mentor/create-mentor.component';
import { CvBankComponent } from './components/cv-bank/cv-bank.component';
import { CvTemplateComponent } from './components/cv-template/cv-template.component';
import { EditAdminComponent } from './components/edit-admin/edit-admin.component';
import { EditMentorComponent } from './components/edit-mentor/edit-mentor.component';
import { JobseekerReportComponent } from './components/jobseeker-report/jobseeker-report.component';
import { MentorProfileUpdateReqComponent } from './components/mentor-profile-update-req/mentor-profile-update-req.component';
import { MentorSessionComponent } from './components/mentor-session/mentor-session.component';
import { DashboardContainerComponent } from './dashboard/dashboard-container/dashboard-container.component';
import { CertExamComponent } from './components/cert-exam/cert-exam.component';

export const AdminRoutes: Route[] = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: 'employers', component: AdminEmployersComponent },
            { path: 'jobs', component: AdminJobsComponent },
            { path: 'dashboard', component: DashboardContainerComponent },
            { path: 'cv-template', component: CvTemplateComponent },
            { path: 'create-admin', component: CreateAdminComponent },
            {
                path: 'edit-admin/:user-id/:index-id/:current-page',
                component: EditAdminComponent,
            }, // <!-- Here first id is user id & second id is loop index no -->
            {
                path: 'edit-mentor/:user-id/:index-id/:current-page',
                component: EditMentorComponent,
            },
            { path: 'create-mentor', component: CreateMentorComponent },
            { path: 'jobseeker-reports', component: JobseekerReportComponent },
            { path: 'cv-bank', component: CvBankComponent },
            { path: 'certified-exams', component: CertExamComponent },
            { path: 'mentor-session', component: MentorSessionComponent },
            {
                path: 'mentor-profile/update',
                component: MentorProfileUpdateReqComponent,
            },
        ],
    },
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerProfileCompletionGuard } from 'app/shared/services/employer-profile-completion.guard';
import { ForceChangePasswordGuard } from 'app/shared/services/force-change-password.guard';
import { EditCareerPageComponent } from '../career-page/components/edit-career-page/edit-career-page.component';
import { ApplicantsComponent } from './components/applicants/applicants.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CreateJobCircularComponent } from './components/create-job-circular/create-job-circular.component';
import { EditJobCircularComponent } from './components/edit-job-circular/edit-job-circular.component';
import { EmployerDashboardComponent } from './components/employer-dashboard/employer-dashboard.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { EmployerComponent } from './employer.component';
import { CvBankComponent } from './components/cv-bank/cv-bank.component';
import { DashboardContainerComponent } from './dashboard/dashboard-container/dashboard-container.component';

const routes: Routes = [
    {
        path: '',
        component: EmployerComponent,
        children: [
            {
                path: 'jobs/new',
                component: CreateJobCircularComponent,
            },
            {
                path: 'jobs/:id', //id --> job id
                component: EditJobCircularComponent,
            },
            {
                path: 'my-jobs',
                component: EmployerDashboardComponent,
                canActivate: [
                    ForceChangePasswordGuard,
                    EmployerProfileCompletionGuard,
                ],
            },
            {
                path: 'dashboard',
                component: DashboardContainerComponent,
                canActivate: [
                    ForceChangePasswordGuard,
                    EmployerProfileCompletionGuard,
                ],
            },
            {
                path: 'applicants/:id', //id --> job id
                component: ApplicantsComponent,
            },
           
            {
                path: 'profile/edit/:id', //id --> user id
                component: ProfileEditComponent,
                canActivate: [
                    ForceChangePasswordGuard,
                    EmployerProfileCompletionGuard,
                ],
            },
            {
                path: 'change-password/:id', //id --> forced-password-change-status
                component: ChangePasswordComponent,
                canActivate: [
                    ForceChangePasswordGuard,
                    EmployerProfileCompletionGuard,
                ],
            },
            {
                path: 'career-page/:id/edit',
                component: EditCareerPageComponent,
            },
            {
                path: 'cv-bank', 
                component: CvBankComponent,
               
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmployerModuleRoutingModule {}

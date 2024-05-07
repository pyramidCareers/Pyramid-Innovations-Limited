import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobseekerProfileCompletionGuard } from 'app/shared/services/jobseeker-profile-completion.guard';
import { ApplicationListComponent } from './components/application-list/application-list.component';
import { ExperiencedProfileMakingComponent } from './components/experienced-profile-making/experienced-profile-making';
import { FavoriteJobsComponent } from './components/favorite-jobs/favorite-jobs.component';
import { FindingJobsPromptComponent } from './components/finding-jobs-prompt/finding-jobs-prompt.component';
import { FresherProfileMakingComponent } from './components/fresher-profile-making/fresher-profile-making.component';
import { JobseekerChangePasswordComponent } from './components/jobseeker-change-password/jobseeker-change-password.component';
import { MentorListComponent } from './components/mentor-list/mentor-list.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { ProfileMakingOptionsComponent } from './components/profile-making-options/profile-making-options.component';
import { ResumeTemplateComponent } from './components/resume-template/resume-template.component';
import { ResumeUploadComponent } from './components/resume-upload/resume-upload.component';
import { UploadingCvComponent } from './components/uploading-cv/uploading-cv.component';
import { CertifiedExamComponent } from './components/certified-exam/certified-exam.component';
import { DashboardContainerComponent } from './dashboard/dashboard-container/dashboard-container.component';
import { WebinarListComponent } from './components/webinar-list/webinar-list.component';

const routes: Routes = [
    {
        path: 'onboarding',
        component: ProfileMakingOptionsComponent,
        canActivate: [JobseekerProfileCompletionGuard],
    },
    {
        path: 'experienced/profile-making',
        component: ExperiencedProfileMakingComponent,
        canActivate: [JobseekerProfileCompletionGuard],
    },
    {
        path: 'fresher/profile-making',
        component: FresherProfileMakingComponent,
        canActivate: [JobseekerProfileCompletionGuard],
    },
    {
        path: 'finding-jobs',
        component: FindingJobsPromptComponent,
        canActivate: [JobseekerProfileCompletionGuard],
    },
    {
        path: 'profile/resume-upload',
        component: ResumeUploadComponent,
        canActivate: [JobseekerProfileCompletionGuard],
    },
    {
        path: 'uploading-cv',
        component: UploadingCvComponent,
        canActivate: [JobseekerProfileCompletionGuard],
    },
    {
        path: ':id/applications',
        component: ApplicationListComponent,
        canActivate: [JobseekerProfileCompletionGuard],
    },
    {
        path: 'resume-template',
        component: ResumeTemplateComponent,
        canActivate: [JobseekerProfileCompletionGuard],
    },
    {
        path: 'change-password',
        component: JobseekerChangePasswordComponent,
        canActivate: [JobseekerProfileCompletionGuard],
    },
    {
        path: 'my-courses',
        component: MyCoursesComponent,
        canActivate: [JobseekerProfileCompletionGuard],
    },
    {
        path: ':id/favorite-jobs',
        component: FavoriteJobsComponent,
        canActivate: [JobseekerProfileCompletionGuard],
    },
    {
        path: 'mentors',
        component: MentorListComponent,
    },
    {
        path: 'certified-exams',
        component:  CertifiedExamComponent,
        canActivate: [JobseekerProfileCompletionGuard],
    },
    {
        path: 'dashboard',
        component:  DashboardContainerComponent,
        canActivate: [JobseekerProfileCompletionGuard],
    },
    {
        path: 'my-webinars',
        component: WebinarListComponent,
        canActivate: [JobseekerProfileCompletionGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class JobseekerRoutingModule {}

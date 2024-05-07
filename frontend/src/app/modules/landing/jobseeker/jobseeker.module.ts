import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobseekerRoutingModule } from './jobseeker-routing.module';
import { ProfileMakingOptionsComponent } from './components/profile-making-options/profile-making-options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { ExperiencedProfileMakingComponent } from './components/experienced-profile-making/experienced-profile-making';
import { FresherProfileMakingComponent } from './components/fresher-profile-making/fresher-profile-making.component';
import { FindingJobsPromptComponent } from './components/finding-jobs-prompt/finding-jobs-prompt.component';
import { UploadingCvComponent } from './components/uploading-cv/uploading-cv.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatListModule } from '@angular/material/list';
import { ProfileSidebarComponent } from './components/profile-sidebar/profile-sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SkillAddComponent } from './components/skill-add/skill-add.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditSkillComponent } from './components/edit-skill/edit-skill.component';
import { AddExperienceComponent } from './components/add-experience/add-experience.component';
import { EditExperienceComponent } from './components/edit-experience/edit-experience.component';
import { AddEducationComponent } from './components/add-education/add-education.component';
import { EditEducationComponent } from './components/edit-education/edit-education.component';
import { EditBasicInfoModalComponent } from './components/edit-basic-info-modal/edit-basic-info-modal.component';
import { EditJobseekingInfoModalComponent } from './components/edit-jobseeking-info-modal/edit-jobseeking-info-modal.component';
import { ResumeUploadComponent } from './components/resume-upload/resume-upload.component';
import { DeleteExperienceModalComponent } from './components/delete-experience-modal/delete-experience-modal.component';
import { DeleteEducationModalComponent } from './components/delete-education-modal/delete-education-modal.component';
import { DeleteSkillModalComponent } from './components/delete-skill-modal/delete-skill-modal.component';
import { ApplicationListComponent } from './components/application-list/application-list.component';
import { ExtraCurricularComponent } from './components/extra-curricular/extra-curricular.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { AddCerificationModalComponent } from './components/add-cerification-modal/add-cerification-modal.component';
import { EditCerificationModalComponent } from './components/edit-cerification-modal/edit-cerification-modal.component';
import { DeleteCertificationModalComponent } from './components/delete-certification-modal/delete-certification-modal.component';
import { AddExtraCurricularModalComponent } from './components/add-extra-curricular-modal/add-extra-curricular-modal.component';
import { EditExtraCurricularModalComponent } from './components/edit-extra-curricular-modal/edit-extra-curricular-modal.component';
import { RemoveExtraCurricularModalComponent } from './components/remove-extra-curricular-modal/remove-extra-curricular-modal.component';
import { ResumeTemplateComponent } from './components/resume-template/resume-template.component';
import { JobseekerChangePasswordComponent } from './components/jobseeker-change-password/jobseeker-change-password.component';
import { JobseekerChangePassSuccesfullModalComponent } from './components/jobseeker-change-pass-succesfull-modal/jobseeker-change-pass-succesfull-modal.component';
import { FavoriteJobsComponent } from './components/favorite-jobs/favorite-jobs.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { MentorListComponent } from './components/mentor-list/mentor-list.component';
import { CertifiedExamComponent } from './components/certified-exam/certified-exam.component';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { DashboardContainerComponent } from './dashboard/dashboard-container/dashboard-container.component';
import { StatisticsComponent } from './dashboard/statistics/statistics.component';
import { WebinarListComponent } from './components/webinar-list/webinar-list.component';

@NgModule({
    declarations: [
        ProfileMakingOptionsComponent,
        ExperiencedProfileMakingComponent,
        FresherProfileMakingComponent,
        FindingJobsPromptComponent,
        UploadingCvComponent,
        ProfileComponent,
        ProfileSidebarComponent,
        SkillAddComponent,
        EditSkillComponent,
        AddExperienceComponent,
        EditExperienceComponent,
        AddEducationComponent,
        EditEducationComponent,
        EditBasicInfoModalComponent,
        EditJobseekingInfoModalComponent,
        ResumeUploadComponent,
        DeleteExperienceModalComponent,
        DeleteEducationModalComponent,
        DeleteSkillModalComponent,
        ApplicationListComponent,
        ExtraCurricularComponent,
        CertificationsComponent,
        AddCerificationModalComponent,
        EditCerificationModalComponent,
        DeleteCertificationModalComponent,
        AddExtraCurricularModalComponent,
        EditExtraCurricularModalComponent,
        RemoveExtraCurricularModalComponent,
        ResumeTemplateComponent,
        JobseekerChangePasswordComponent,
        JobseekerChangePassSuccesfullModalComponent,
        FavoriteJobsComponent,
        MyCoursesComponent,
        MentorListComponent,
        CertifiedExamComponent,
        CourseItemComponent,
        DashboardContainerComponent,
        StatisticsComponent,
        WebinarListComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        JobseekerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatDialogModule,
    ],
})
export class JobseekerModule {}

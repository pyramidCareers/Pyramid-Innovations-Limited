import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AddTimeslotModalComponent } from './components/add-timeslot-modal/add-timeslot-modal.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MentorDashboardComponent } from './components/mentor-dashboard/mentor-dashboard.component';
import { MentorEditAboutModalComponent } from './components/mentor-edit-about-modal/mentor-edit-about-modal.component';
import { MentorEditBasicInfoModalComponent } from './components/mentor-edit-basic-info-modal/mentor-edit-basic-info-modal.component';
import { MentorProfileComponent } from './components/mentor-profile/mentor-profile.component';
import { MentorSidebarComponent } from './components/mentor-sidebar/mentor-sidebar.component';
import { TimeslotBookingRequestModalComponent } from './components/timeslot-booking-request-modal/timeslot-booking-request-modal.component';
import { WebinarListComponent } from './components/webinar-list/webinar-list.component';
import { MentorComponent } from './mentor.component';
import { MentorRoutes } from './mentor.routing';
import { EditWebinarComponent } from './components/edit-webinar/edit-webinar.component';

@NgModule({
    declarations: [
        CalendarComponent,
        MentorComponent,
        MentorSidebarComponent,
        AddTimeslotModalComponent,
        TimeslotBookingRequestModalComponent,
        MentorProfileComponent,
        MentorEditBasicInfoModalComponent,
        MentorEditAboutModalComponent,
        MentorDashboardComponent,
        WebinarListComponent,
        EditWebinarComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        SharedModule,
        MatIconModule,
        MatListModule,
        MatSelectModule,
        MatSidenavModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        RouterModule.forChild(MentorRoutes),
    ],
})
export class MentorModule {}

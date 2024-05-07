import { Route } from '@angular/router';
import { MentorGuardService } from 'app/shared/services/mentor-guard.service';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MentorDashboardComponent } from './components/mentor-dashboard/mentor-dashboard.component';
import { MentorProfileComponent } from './components/mentor-profile/mentor-profile.component';
import { WebinarListComponent } from './components/webinar-list/webinar-list.component';
import { MentorComponent } from './mentor.component';

export const MentorRoutes: Route[] = [
    {
        path: '',
        component: MentorComponent,
        children: [
            { path: 'dashboard', component: MentorDashboardComponent },
            { path: 'profile', component: MentorProfileComponent },
            {
                path: 'calendar/month/:month/year/:year',
                component: CalendarComponent,
                canActivate: [MentorGuardService],
            },
            {
                path: 'webinars',
                component: WebinarListComponent,
                canActivate: [MentorGuardService],
            },
        ],
    },
];

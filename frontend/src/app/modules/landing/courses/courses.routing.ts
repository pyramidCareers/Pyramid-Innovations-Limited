import { Route } from '@angular/router';
import { CoursesComponent } from 'app/modules/landing/courses/courses.component';
import { AuthGuard } from 'app/shared/services/auth.guard';

export const CoursesRoutes: Route[] = [
    {
        path: '',
        component: CoursesComponent,
        canActivate: [AuthGuard],
    },
];

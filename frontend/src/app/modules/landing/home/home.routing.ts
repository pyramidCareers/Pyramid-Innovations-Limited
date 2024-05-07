import { Route } from '@angular/router';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { AuthGuard } from 'app/shared/services/auth.guard';
import { CoachesComponent } from './components/coaches/coaches.component';
import { CareerPageComponent } from '../career-page/career-page.component';
import { SubdomainAuthGuard } from 'app/shared/services/subdomain-guard';

export const landingHomeRoutes: Route[] = [
    {
        path: '',
        children: [
            { path: '', component: LandingHomeComponent },
            {
                path: 'coaches',
                component: CoachesComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'career-page', 
                loadChildren: () =>
                    import(
                        'app/modules/landing/career-page/career-page.module'
                    ).then((m) => m.CareerPageModule),
                canActivate: [SubdomainAuthGuard],
            }
        ],
    },
];

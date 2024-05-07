import { Route } from '@angular/router';
import { CareerPageComponent } from './career-page.component';
import { EditCareerPageComponent } from './components/edit-career-page/edit-career-page.component';

export const CareerPageRoutes: Route[] = [
    {
        path: '',
        component: CareerPageComponent,
    },
    {
        path: 'edit',
        component: EditCareerPageComponent,
    },
];

import { Route } from '@angular/router';
import { JobDetailsComponent } from './job-details.component';
import { CreatePetComponent } from './components/create-pet/create-pet.component';
import { EditPetComponent } from './components/edit-pet/edit-pet.component';
import { JobReadyComponent } from './components/job-ready/job-ready.component';

export const JobDetailsRoutes: Route[] = [
    {
        path: '',
        component: JobDetailsComponent,
    },
    {
        path: 'pet/create',
        component: CreatePetComponent
    },
    {
        path: 'job-ready-programme',
        component: JobReadyComponent
    },
    {
        path: 'pet/:conditionId/edit',
        component: EditPetComponent
    }
];

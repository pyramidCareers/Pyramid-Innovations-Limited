import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CareerPageComponent } from './career-page.component';
import { CareerPageRoutes } from './career-page.routing';
import { DescriptionCareerPageComponent } from './components/description-career-page/description-career-page.component';
import { EditCareerPageComponent } from './components/edit-career-page/edit-career-page.component';
import { LifeAtCareerPageComponent } from './components/life-at-career-page/life-at-career-page.component';
import { OpenJobCareerPageComponent } from './components/open-job-career-page/open-job-career-page.component';

@NgModule({
    declarations: [
        CareerPageComponent,
        DescriptionCareerPageComponent,
        LifeAtCareerPageComponent,
        OpenJobCareerPageComponent,
        EditCareerPageComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(CareerPageRoutes),
    ],
})
export class CareerPageModule {}

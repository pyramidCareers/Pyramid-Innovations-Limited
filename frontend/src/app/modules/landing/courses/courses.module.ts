import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CoursesRoutes } from './courses.routing';

@NgModule({
    declarations: [CoursesComponent],
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        RouterModule.forChild(CoursesRoutes),
    ],
})
export class CoursesModule {}

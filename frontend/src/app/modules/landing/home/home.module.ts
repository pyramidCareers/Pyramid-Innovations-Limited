import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { landingHomeRoutes } from 'app/modules/landing/home/home.routing';
import { SharedModule } from 'app/shared/shared.module';
import { SwiperModule } from 'swiper/angular';
import { AdviceComponent } from './components/advice/advice.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { BannerComponent } from './components/banner/banner.component';
import { CoachesComponent } from './components/coaches/coaches.component';
import { FeaturesComponent } from './components/features/features.component';
import { MentorsComponent } from './components/mentors/mentors.component';
import { PartnersComponent } from './components/partners/partners.component';

@NgModule({
    declarations: [
        LandingHomeComponent,
        AdviceComponent,
        ArticlesComponent,
        BannerComponent,
        FeaturesComponent,
        MentorsComponent,
        PartnersComponent,
        CoachesComponent,
    ],
    imports: [
        RouterModule.forChild(landingHomeRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        SwiperModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class LandingHomeModule {}

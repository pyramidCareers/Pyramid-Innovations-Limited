import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BasicInfo } from 'app/modules/landing/jobseeker/models/basic-info';
import { EventData } from 'app/modules/landing/jobseeker/models/event-data';
import { EventService } from 'app/shared/services/event.service.service';
import { environment } from 'environments/environment';
import { MentorProfileService } from '../../services/mentor-profile.service';
import { MentorEditAboutModalComponent } from '../mentor-edit-about-modal/mentor-edit-about-modal.component';
import { MentorEditBasicInfoModalComponent } from '../mentor-edit-basic-info-modal/mentor-edit-basic-info-modal.component';
import { AboutInfo } from './../../models/mentor-about';

@Component({
    selector: 'app-mentor-profile',
    templateUrl: './mentor-profile.component.html',
    styleUrls: ['./mentor-profile.component.scss'],
})
export class MentorProfileComponent implements OnInit {
    BasicInfo: BasicInfo = {} as BasicInfo;
    AboutInfo: AboutInfo = {} as AboutInfo;
    isOwnProfile: boolean;
    loading: boolean = false;

    constructor(
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private sanitize: DomSanitizer,
        private eventService: EventService,
        private mentorAPI: MentorProfileService
    ) {}

    userID: any;
    basicData: any;
    aboutData: any;
    showBasicInfo: boolean = false;

    male_avater: any = this.sanitize.bypassSecurityTrustResourceUrl(
        'assets/images/avatars/male.png'
    );
    female_avater: any = this.sanitize.bypassSecurityTrustResourceUrl(
        'assets/images/avatars/female.png'
    );

    ngOnInit() {
        this.loading = true;
        this.userID = this.route.snapshot.parent?.params['id'];

        if (this.userID == localStorage.getItem('user-id')) {
            this.isOwnProfile = true;
        } else this.isOwnProfile = false;

        if (
            localStorage.getItem('type-code') === environment.admin_type_code ||
            this.userID == localStorage.getItem('user-id')
        ) {
            this.showBasicInfo = true;
        }

        this.mentorAPI
            .getProfileBasicData(this.userID)
            .subscribe((res: any) => {
                this.loading = false;
                this.basicData = res?.data;
                this.setBasciData(res?.data);
            });
        this.mentorAPI
            .getProfileAboutData(this.userID)
            .subscribe((res: any) => {
                this.aboutData = res?.data;
                this.setAboutData(res?.data);
            });

        this.eventService.event$.subscribe((data: EventData) => {
            if (data.source == 'mentor-basic') {
                this.basicData = data?.obj;
                this.BasicInfo = data?.obj;
            }
            if (data.source == 'mentor-about') {
                this.aboutData = data?.obj;
                this.AboutInfo = data?.obj;
                this.AboutInfo.speciality = data?.obj?.specialty;
            }
        });
    }

    editBasicInfo() {
        localStorage.setItem('firstname', this.BasicInfo.firstname);
        localStorage.setItem('lastname', this.BasicInfo.lastname);
        localStorage.setItem('phone', this.BasicInfo.phone);
        localStorage.setItem('profile_pic', this.BasicInfo.profile_pic);
        localStorage.setItem('gender', this.BasicInfo.gender);

        const dialog = this.dialog.open(MentorEditBasicInfoModalComponent);
    }

    setBasciData(data: any) {
        if (data.firstname) this.BasicInfo.firstname = data.firstname;
        if (data.lastname) this.BasicInfo.lastname = data.lastname;
        if (data.gender) this.BasicInfo.gender = data.gender;
        if (!data.phone || data.phone == 'undefined') {
            this.BasicInfo.phone = '';
        } else {
            this.BasicInfo.phone = data.phone;
        }
    }

    editAbout() {
        localStorage.setItem('bio', this.AboutInfo.bio || '');
        localStorage.setItem('profession', this.AboutInfo.profession || '');
        localStorage.setItem('speciality', this.AboutInfo.speciality || '');
        localStorage.setItem('industry', this.AboutInfo.industry || '');

        const dialog = this.dialog.open(MentorEditAboutModalComponent);
    }

    setAboutData(data: any) {
        if (data.bio) this.AboutInfo.bio = data.bio;
        if (data.profession) this.AboutInfo.profession = data.profession;
        if (data.specialty) this.AboutInfo.speciality = data.specialty;
        if (data.industry) this.AboutInfo.industry = data.industry;
    }
}

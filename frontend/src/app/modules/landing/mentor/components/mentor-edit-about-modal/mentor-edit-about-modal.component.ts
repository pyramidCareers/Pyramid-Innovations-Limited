import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UpdateBasicInfoService } from 'app/modules/landing/jobseeker/services/update-basic-info.service';
import { EventService } from 'app/shared/services/event.service.service';
import { AboutInfo } from '../../models/mentor-about';

@Component({
    selector: 'app-mentor-edit-about-modal',
    templateUrl: './mentor-edit-about-modal.component.html',
    styleUrls: ['./mentor-edit-about-modal.component.scss'],
})
export class MentorEditAboutModalComponent {
    AboutInfo: AboutInfo = {} as AboutInfo;

    constructor(
        private eventService: EventService,
        private dialogRef: MatDialogRef<any>,
        private updateBasicInfoApi: UpdateBasicInfoService
    ) {}

    ngOnInit() {
        this.setVal();
    }

    setVal() {
        this.AboutInfo.bio = localStorage.getItem('bio');
        this.AboutInfo.profession = localStorage.getItem('profession');
        this.AboutInfo.speciality = localStorage.getItem('speciality');
        this.AboutInfo.industry = localStorage.getItem('industry');
    }

    updateAbout() {
        this.updateBasicInfoApi
            .updateAboutInfo(this.AboutInfo)
            .subscribe((res: any) => {
                if (res.status && res.status == true) {
                    this.eventService.mentorData('mentor-about', 'edit', res.data);
                }
                this.dialogRef.close();
            });
        this.dialogRef.close();
    }

    areAllFieldsFilled() {
        return (
            this.AboutInfo.bio &&
            this.AboutInfo.profession &&
            this.AboutInfo.speciality &&
            this.AboutInfo.industry
        );
    }

    ngOnDestroy() {
        this.unsetVal();
    }

    unsetVal() {
        localStorage.removeItem('bio');
        localStorage.removeItem('profession');
        localStorage.removeItem('speciality');
        localStorage.removeItem('industry');
    }
}

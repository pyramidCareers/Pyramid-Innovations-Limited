import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BasicInfo } from 'app/modules/landing/jobseeker/models/basic-info';
import { UpdateBasicInfoService } from 'app/modules/landing/jobseeker/services/update-basic-info.service';
import { EventService } from 'app/shared/services/event.service.service';
import { AboutInfo } from './../../models/mentor-about';

@Component({
    selector: 'app-mentor-edit-basic-info-modal',
    templateUrl: './mentor-edit-basic-info-modal.component.html',
    styleUrls: ['./mentor-edit-basic-info-modal.component.scss'],
})
export class MentorEditBasicInfoModalComponent {
    constructor(
        private eventService: EventService,
        private dialogRef: MatDialogRef<any>,
        private updateBasicInfoApi: UpdateBasicInfoService
    ) {}

    BasicInfo: BasicInfo = {} as BasicInfo;
    AboutInfo: AboutInfo = {} as AboutInfo;

    onProfilePicUpload(event: any) {
        const file = event.target.files[0];
        this.BasicInfo.profile_pic = file;
    }

    ngOnInit() {
        this.setVal();
    }

    edit() {
        this.updateBasicInfoApi
            .updateBasicInfo(this.BasicInfo)
            .subscribe((res: any) => {
                if (res.status && res.status == true) {
                    if (res.data) {
                        this.eventService.mentorData('mentor-basic', 'edit', res.data);
                    }
                }
                this.dialogRef.close();
            });
        this.dialogRef.close();
    }

    setVal() {
        this.BasicInfo.firstname = localStorage.getItem('firstname');
        this.BasicInfo.lastname = localStorage.getItem('lastname');
        this.BasicInfo.phone = localStorage.getItem('phone');
        this.BasicInfo.profile_pic = localStorage.getItem('profile_pic');
        this.BasicInfo.gender = localStorage.getItem('gender');
    }

    areAllFieldsFilled() {
        return (
            this.BasicInfo.firstname &&
            this.BasicInfo.lastname &&
            this.BasicInfo.phone &&
            this.BasicInfo.gender
        );
    }

    ngOnDestroy() {
        this.unsetVal();
    }

    unsetVal() {
        localStorage.removeItem('phone');
        localStorage.removeItem('profile_pic');
        localStorage.removeItem('gender');
    }
}

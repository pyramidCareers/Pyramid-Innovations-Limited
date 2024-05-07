import { Component } from '@angular/core';
import { MentorSessionService } from '../../services/mentor-session.service';
import { MentorProfileService } from 'app/modules/landing/mentor/services/mentor-profile.service';
import { UpdateBasicInfoService } from 'app/modules/landing/jobseeker/services/update-basic-info.service';
import { EventService } from 'app/shared/services/event.service.service';
import { EventData } from 'app/modules/landing/jobseeker/models/event-data';


@Component({
    selector: 'app-mentor-profile-update-req',
    templateUrl: './mentor-profile-update-req.component.html',
    styleUrls: ['./mentor-profile-update-req.component.scss'],
})
export class MentorProfileUpdateReqComponent {
    constructor(
        private _httpGet: MentorProfileService,
        private _httpUpdate: UpdateBasicInfoService,
        private eventService: EventService
    ) {}

    loading: boolean = false;
    id: any = '';
    mentors: any[] = [];
    notFound: boolean = false;

    ngOnInit() {
        this.loading = true;
        this._httpGet.get_pending_mentor().subscribe((res:any) => {
            this.mentors = res?.data?.data;
            this.loading = false;
        },(error:any)=>{
            this.loading = false;
            this.notFound = true;
        
        });

        this.eventService.event$.subscribe((data: EventData) => {
            if (data.action === 'edit') {
                let index: any;
                if (data.source === 'mentor-update') {
                    if (data.obj.id)
                        index = this.mentors.findIndex(
                            (mentor) => mentor.id === data.obj.id
                        );
                    if (index !== -1) {
                        this.mentors[index].status = data.obj.status;
                        setTimeout(() => {
                            this.mentors.splice(index, 1);
                        }, 500);
                    }
                }
            }
        });
    }

    isMobileView(): boolean {
        return window.innerWidth < 600;
    }
    isclick:boolean = false;
    approve(id) {
        this.id = id;
        this._httpUpdate.updateStatus(id).subscribe((res) => {
            console.log(res?.data);
            if (res.status && res.status == true) {
                this.eventService.mentorUpdate(
                    'mentor-update',
                    'edit',
                    res?.data
                );
            }
        });
        this.isclick = true;
    }

    availableColors = [
        {name: 'Approve', color: 'primary'},
      ];
}

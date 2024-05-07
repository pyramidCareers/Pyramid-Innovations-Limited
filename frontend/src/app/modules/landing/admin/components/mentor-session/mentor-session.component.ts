import { Component, Inject, OnInit,  HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';
import { ceil } from 'lodash';
import { MentorSessionService } from '../../services/mentor-session.service';
import { SeriesDetailsComponent } from '../series-details/series-details.component';
import { EventService } from 'app/shared/services/event.service.service';
import { EventData } from 'app/modules/landing/jobseeker/models/event-data';


const PAGE_SIZE = 3;

@Component({
  selector: 'app-mentor-session',
  templateUrl: './mentor-session.component.html',
  styleUrls: ['./mentor-session.component.scss']
})
export class MentorSessionComponent {

    totalPages = 0;
    currentPage = 1;
    webinars: any[] = [];
    isLogin: boolean;
    loading: boolean = false;
    windowWidth: any;
    selectedWebinarType:any = '2';

    constructor(
        private dialog: MatDialog,
        private eventService: EventService,
        private mentorAPI: MentorSessionService,
        @Inject(DOCUMENT) private document: Document
    ) {}



    ngOnInit() {

        this.loading=true;

        this.mentorAPI.getWebinars(this.currentPage).subscribe(
            (res: any) => {
               
                
                if(res.status && res.status == true){
                    this.webinars = res?.data?.data;
                    
                    
                    this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                }
               
                this.loading = false;
            },
            (err: any) => {}
        );

         this.eventService.event$.subscribe((data: EventData) => {
            if (data.source === 'webinar' && data.action == 'edit') {
               
                const index = this.webinars.findIndex(
                    (wb) => wb.id === data.obj.id
                );
                if (index != -1) {
                    this.webinars[index].approved = +data.obj.approved;
                    this.webinars[index].registration_fee = +data.obj.registration_fee;
                    this.webinars[index].title = data.obj.title;
                    this.webinars[index].description = data.obj.description;
                    this.webinars[index].date = data.obj.date;
                    this.webinars[index].start_time = data.obj.start_time;
                    this.webinars[index].end_time = data.obj.end_time;
                }
              
            }
        })

    }

    onWebinarTypeChange() {
        this.currentPage = 1;
        if(this.selectedWebinarType == '2'){
            this.mentorAPI.getWebinars(this.currentPage).subscribe(
                (res: any) => {
                    if(res.status && res.status == true){
                        this.webinars = res?.data?.data;
                        this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                    }
                   
                    this.loading = false;
                },
                (err: any) => {}
            );
        }
        else if(this.selectedWebinarType == '1' || this.selectedWebinarType == '0'){   
            
            this.mentorAPI.getFilteredWebinars(this.currentPage, this.selectedWebinarType).subscribe(
                (res: any) => {
                    if(res.status && res.status == true){
                        this.webinars = res?.data?.data;
                        this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                    }
                   
                    this.loading = false;
                },
                (err: any) => {}
            );
 
        }    
    }


    isMobileView(): boolean {
        return window.innerWidth < 600;
    }



    goToEdit(webinarId:any, webinarStatus:any) {
        localStorage.setItem('webinar-id', webinarId);
        localStorage.setItem('webinar-status', webinarStatus);
       
        const index = this.webinars.findIndex( (wb) => wb.id === webinarId );
        if (index != -1) {
           
            localStorage.setItem('webinar-title', this.webinars[index].title);
            localStorage.setItem('webinar-desc', this.webinars[index].description);
            localStorage.setItem('webinar-start',  this.webinars[index].start_time);
            localStorage.setItem('webinar-end', this.webinars[index].end_time);
            localStorage.setItem('webinar-date', this.webinars[index].date);
            localStorage.setItem('webinar-fee', this.webinars[index].registration_fee);
            
           this.dialog.open( SeriesDetailsComponent );
        }
    }


    getPageRange(): number[] {
        const pageRange = [];
        const start = Math.max(1, this.currentPage - Math.floor(PAGE_SIZE / 2));
        const end = Math.min(start + PAGE_SIZE - 1, this.totalPages);

        for (let page = start; page <= end; page++) {
            pageRange.push(page);
        }

        if (end < this.totalPages) {
            pageRange.push('...');
            pageRange.push(this.totalPages);
        }

        return pageRange;
    }

    previousPage() {
        this.loading = true;

        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;

        if (this.currentPage > 1) {
            this.currentPage--;
            this.mentorAPI.getWebinars(this.currentPage).subscribe(
                (res: any) => {
                    if(res.status && res.status == true){
                        this.webinars = res?.data?.data;
                        this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                    }
                    this.loading = false;
                },
                (err: any) => {}
            );
        }
    }

    nextPage() {
        this.loading = true;

        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;

        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.mentorAPI.getWebinars(this.currentPage).subscribe(
                (res: any) => {
                    if(res.status && res.status == true){
                        this.webinars = res?.data?.data;
                        this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                    }
                    this.loading = false;
                },
                (err: any) => {}
            );
        }
    }

    goToPage(page: number | string) {
        if (typeof page === 'number') {
            this.loading = true;
            this.currentPage = page;

            this.document.body.scrollTop = 0;
            this.document.documentElement.scrollTop = 0;

            this.mentorAPI.getWebinars(this.currentPage).subscribe(
                (res: any) => {
                    if(res.status && res.status == true){
                        this.webinars = res?.data?.data;
                        this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                    }
                    this.loading = false;
                },
                (err: any) => {}
            );
        }
    }

    convertTo12HourFormat(time:any) {

        let [hours, minutes] = time.split(':');
    
        let period = +hours < 12 ? 'AM' : 'PM';
    
        hours = +hours % 12 || 12;
    
        return `${hours}:${minutes} ${period}`;
    
    }

}

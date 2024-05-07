import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ceil } from 'lodash';
import { MentorWebinarService } from '../../services/mentor-webinar.service';
import { Webinar } from 'app/modules/landing/jobseeker/models/webinar';
import { MatDialog } from '@angular/material/dialog'
import { EditWebinarComponent } from '../edit-webinar/edit-webinar.component';
import { EventService } from 'app/shared/services/event.service.service';
import { EventData } from 'app/modules/landing/jobseeker/models/event-data';

const PAGE_SIZE = 3;

@Component({
  selector: 'app-webinar-list',
  templateUrl: './webinar-list.component.html',
  styleUrls: ['./webinar-list.component.scss']
})
export class WebinarListComponent {
  userID: any;
  totalPages = 0;
  currentPage = 1;
  isLogin: boolean;
  webinars:Webinar[] = [];
  loading: boolean = false;
  selectedWebinarType: string = 'all';
  reqBody:any;

  constructor(
      private _router: Router,
      private dialog: MatDialog,
      private webinarApi: MentorWebinarService,
      private eventService: EventService,
      @Inject(DOCUMENT) private document: Document
  ) {}

 

  ngOnInit(): void {
      this.userID = localStorage.getItem('user-id');
      this.loading = true;
      this.reqBody = {} as any;
     

      this.document.body.scrollTop = 0;
      this.document.documentElement.scrollTop = 0;

      this.isLogin = localStorage.getItem('auth-token') ? true : false;
     
      this.webinarApi.getWebinars(this.reqBody).subscribe(
         (res:any)=>{
           
            if(res.status && res.status == true){
                  this.setWebinarData( res?.data?.data );
                  this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                  this.loading = false;

            }
          },
          (error:any)=>{
            console.log("Error fetching data");
            
          }    
      )

      this.eventService.event$.subscribe((data: EventData) => {
        if (data.source === 'webinar' && data.action == 'edit') {
           
            const index = this.webinars.findIndex(
                (wb) => wb.id === data.obj.id
            );
            if (index != -1) {
              
                this.webinars[index].title = data.obj.title;
                this.webinars[index].description = data.obj.description;
                this.webinars[index].date = data.obj.date;
                this.webinars[index].start_time = data.obj.start_time;
                this.webinars[index].end_time = data.obj.end_time;
                this.webinars[index].start_time_display = this.convertTo12HourFormat( data.obj.start_time );
                this.webinars[index].end_time_display = this.convertTo12HourFormat( data.obj.end_time );
            }
          
        }
    })
  }

  displayWbDetails(id:any) {
      this._router.navigate(['webinar', id, 'details']);
  }


  onWebinarTypeChange() {
   
      if(this.selectedWebinarType == 'all')this.reqBody = {} as any;
      else if(this.selectedWebinarType == 'upcoming')this.reqBody = { status: 'upcoming'};
      else if(this.selectedWebinarType == 'past')this.reqBody = { status: 'past'};
      this.loading = true;

      this.currentPage = 1;
      this.webinarApi.getWebinars(this.reqBody).subscribe(
        (res:any)=>{
           
           this.loading = false;
           if(res.status && res.status == true){
                 this.setWebinarData( res?.data?.data );
                 this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                 this.loading = false;

           }
         },
         (error:any)=>{
              this.loading = false;
              console.log("Error fetching data");
         }    
      )
  }

  editWebinar(webinarId:any){
    localStorage.setItem('webinar-id', webinarId);
    
    const index = this.webinars.findIndex( (wb) => wb.id === webinarId );
   
    if (index != -1) {
        localStorage.setItem('webinar-title', this.webinars[index].title);
        localStorage.setItem('webinar-desc', this.webinars[index].description);
        localStorage.setItem('webinar-start',  this.webinars[index].start_time);
        localStorage.setItem('webinar-end', this.webinars[index].end_time);
        localStorage.setItem('webinar-date', this.webinars[index].date);
        this.dialog.open( EditWebinarComponent );
    }
  }

  isMobileView(): boolean {
      return window.innerWidth < 600;
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
          this.webinarApi.getWebinars(this.reqBody).subscribe(
            (res:any)=>{
     
               if(res.status && res.status == true){
                     this.setWebinarData( res?.data?.data );
                     this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                     this.loading = false;
   
               }
             },
             (error:any)=>{
               console.log("Error fetching data");
               
             }    
         )
      }
  }

  nextPage() {
      this.loading = true;
      this.document.body.scrollTop = 0;
      this.document.documentElement.scrollTop = 0;

      if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.webinarApi.getWebinars(this.reqBody).subscribe(
            (res:any)=>{
     
               if(res.status && res.status == true){
                     this.setWebinarData( res?.data?.data );
                     this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                     this.loading = false;
   
               }
             },
             (error:any)=>{
               console.log("Error fetching data");
               
             }    
         )
      }
  }

  goToPage(page: number | string) {
      if (typeof page === 'number') {
          this.loading = true;
          this.currentPage = page;

          this.document.body.scrollTop = 0;
          this.document.documentElement.scrollTop = 0;

          this.webinarApi.getWebinars(this.reqBody).subscribe(
            (res:any)=>{
     
               if(res.status && res.status == true){
                     this.setWebinarData( res?.data?.data );
                     this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                     this.loading = false;
   
               }
             },
             (error:any)=>{
               console.log("Error fetching data");
               
             }    
         )
      }
  }

  convertTo12HourFormat(time:any) {

    let [hours, minutes] = time.split(':');

    let period = +hours < 12 ? 'AM' : 'PM';

    hours = +hours % 12 || 12;

    return `${hours}:${minutes} ${period}`;

  }

  setWebinarData( data:any ){
     
      this.webinars = [];
      for(let wb of data){
          let curWebinar = {} as Webinar;
          curWebinar.date = wb?.date;
          curWebinar.title = wb?.title;
          curWebinar.id = wb?.id;
          curWebinar.start_time =  wb?.start_time;
          curWebinar.end_time = wb?.end_time;
          curWebinar.start_time_display = this.convertTo12HourFormat( wb?.start_time);
          curWebinar.end_time_display = this.convertTo12HourFormat (wb?.end_time );
          curWebinar.description = wb?.description;
          this.webinars.push( curWebinar);
      }
  }
}

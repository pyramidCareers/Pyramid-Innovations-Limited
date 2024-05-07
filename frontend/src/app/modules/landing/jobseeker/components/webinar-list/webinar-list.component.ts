import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ceil } from 'lodash';
import { FavoriteJobsService } from '../../services/favorite-jobs.service';
import { WebinarService } from 'app/modules/landing/webinar/services/webinar.service';
import { Webinar } from '../../models/webinar';

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
      private route: ActivatedRoute,
      private _router: Router,
      private favjobApi: FavoriteJobsService,
      private webinarApi: WebinarService,
      @Inject(DOCUMENT) private document: Document
  ) {}

 

  ngOnInit(): void {
      this.userID = localStorage.getItem('user-id');
      this.loading = true;
      this.reqBody = {} as any;
     

      this.document.body.scrollTop = 0;
      this.document.documentElement.scrollTop = 0;

      this.isLogin = localStorage.getItem('auth-token') ? true : false;
     
      this.webinarApi.getWebinarListByJobseeker(this.userID, this.reqBody, this.currentPage).subscribe(
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

  displayWbDetails(id:any) {
      this._router.navigate(['webinar', id, 'details']);
  }


  onWebinarTypeChange() {
   
      if(this.selectedWebinarType == 'all')this.reqBody = {} as any;
      else if(this.selectedWebinarType == 'upcoming')this.reqBody = { status: 'upcoming'};
      else if(this.selectedWebinarType == 'past')this.reqBody = { status: 'past'};

      this.currentPage = 1;
      this.webinarApi.getWebinarListByJobseeker(this.userID, this.reqBody, this.currentPage).subscribe(
        (res:any)=>{
            
          
            if(res.status && res.status == true){
                  this.setWebinarData( res?.data?.data );
                  this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                  this.loading = false;

            }
        },
        (error:any)=>{
           console.log("Error fetching data", error);
        }    
      )
  
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
          this.webinarApi.getWebinarListByJobseeker(this.userID, this.reqBody, this.currentPage).subscribe(
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
          this.webinarApi.getWebinarListByJobseeker(this.userID, this.reqBody, this.currentPage).subscribe(
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

          this.webinarApi.getWebinarListByJobseeker(this.userID, this.reqBody, this.currentPage).subscribe(
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
          curWebinar.start_time = this.convertTo12HourFormat( wb?.start_time);
          curWebinar.end_time = this.convertTo12HourFormat (wb?.end_time );
          this.webinars.push( curWebinar);
      }
  }
}

import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ceil } from 'lodash';
import { AppliedJobService } from '../../services/applied-job.service';
import { AppliedJob } from '../../models/applied-job';
import { environment } from 'environments/environment';
import { GetTokenService } from 'app/modules/landing/job-details/services/get-token.service';

const PAGE_SIZE = 3;

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent {
  userID:any;
  courses:any[] = [];
  returnURL: string;
  totalPages = 0;
  currentPage = 1;
  isLogin: boolean;
  appliedJobs: AppliedJob[] = [];
  loading: boolean = false;

  constructor(
       private route:ActivatedRoute,
       private _router:Router,
       private courseApi: AppliedJobService,
       private dialog: MatDialog,
       private _getToken: GetTokenService,
       @Inject(DOCUMENT) private document: Document
  ){
     this.returnURL = window.location.href;
  }



  ngOnInit(): void {
      this.userID = this.route.snapshot.params['id'];
      this.loading = true;

      this.document.body.scrollTop = 0;
      this.document.documentElement.scrollTop = 0;

      this.isLogin = localStorage.getItem('auth-token') ? true : false;
      this.courseApi.getCompletedCourses(localStorage.getItem('user-id')).subscribe(
          (res: any) => {
                
                if(res.data && res.data.courses)
                   this.courses = res.data?.courses;
                
               //this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                this.loading = false;
               
               
          },
          (error) => {
              console.log('Error fetching all courses:', error);
          }
      );
  }

  displayCourseDetails(id:any) {
    const course_url = environment.moodle_base_URL + '/course/view.php?id=' + id;
    this._getToken.getToken(
            localStorage.getItem('user-email'),
            localStorage.getItem('moodle-token'),
            course_url,
            this.returnURL
        ).subscribe((res: any) => {
            const url = `${environment.moodle_base_URL}/auth/pyramid/callback.php?token=${res?.data?.jwtToken}`;
            window.open(url, '_blank');
        });
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
        //   this.jobApi.getJobList(this.currentPage).subscribe(
        //       (res: any) => {
        //         this.getAppliedJobs(res);
        //           this.totalPages = ceil(
        //               res?.data?.total / res?.data?.per_page
        //           );
        //           this.loading = false;
        //       },
        //       (error) => {
        //           console.log('Error fetching all jobs:', error);
        //       }
        //   );
      }
  }

  nextPage() {
      this.loading = true;

      this.document.body.scrollTop = 0;
      this.document.documentElement.scrollTop = 0;

      if (this.currentPage < this.totalPages) {
          this.currentPage++;
        //   this.jobApi.getJobList(this.currentPage).subscribe(
        //       (res: any) => {
        //           this.getAppliedJobs(res);
        //           this.totalPages = ceil(
        //               res?.data?.total / res?.data?.per_page
        //           );
        //           this.loading = false;
        //       },
        //       (error) => {
        //           console.log('Error fetching all jobs:', error);
        //       }
        //   );
      }
  }

  goToPage(page: number | string) {
      if (typeof page === 'number') {
          this.loading = true;
          this.currentPage = page;

          this.document.body.scrollTop = 0;
          this.document.documentElement.scrollTop = 0;

        //   this.jobApi.getJobList(this.currentPage).subscribe(
        //       (res: any) => {
        //           this.getAppliedJobs(res);
        //           this.totalPages = ceil(
        //               res?.data?.total / res?.data?.per_page
        //           );
        //           this.loading = false;
        //       },
        //       (error) => {
        //           console.log('Error fetching all jobs:', error);
        //       }
        //   );
      }
  }

}

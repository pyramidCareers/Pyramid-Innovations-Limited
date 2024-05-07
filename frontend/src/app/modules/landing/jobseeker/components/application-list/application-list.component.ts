
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ceil } from 'lodash';
import { AppliedJobService } from '../../services/applied-job.service';
import { ApplyModalJobListComponent } from 'app/modules/landing/jobs/components/apply-modal-job-list/apply-modal-job-list.component';
import { AppliedJob } from '../../models/applied-job';

const PAGE_SIZE = 3;

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent {

  userID:any;

  constructor(
       private route:ActivatedRoute,
       private _router:Router,
       private jobApi: AppliedJobService,
       private dialog: MatDialog,
       @Inject(DOCUMENT) private document: Document
  ){}



  totalPages = 0;
  currentPage = 1;
  isLogin: boolean;
  appliedJobs: AppliedJob[] = [];
  loading: boolean = false;

  ngOnInit(): void {
      this.userID = this.route.snapshot.params['id'];
      this.loading = true;

      this.document.body.scrollTop = 0;
      this.document.documentElement.scrollTop = 0;

      this.isLogin = localStorage.getItem('auth-token') ? true : false;
      this.jobApi.getJobList(this.currentPage).subscribe(
          (res: any) => {
              // this.allJobs = res?.data?.data;
              this.getAppliedJobs(res);
            
              this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
             
              this.loading = false;
          },
          (error) => {
              console.log('Error fetching all jobs:', error);
          }
      );
  }

  displayJobDetails(id) {
      this._router.navigate(['jobs', id]);
  }


  getAppliedJobs(apiResponse:any){
      this.appliedJobs = [];
      if( apiResponse.data ){
              if(apiResponse.data.data){
                let jobList:any[] = apiResponse.data.data;
                

                for(let jobInfo of jobList){

                      let currentJob:AppliedJob = {} as AppliedJob;

                      if(jobInfo.created_at){
                          currentJob.appliedDate = jobInfo.created_at;
                      }
                      if(   jobInfo.job   ){
                          if(jobInfo.job.id)currentJob.id = jobInfo.job.id;
                          if(jobInfo.job.title)currentJob.title = jobInfo.job.title;
                          if(jobInfo.job.location)currentJob.location = jobInfo.job.location;
                          if(jobInfo.job.created_at)currentJob.createdDate = jobInfo.job.created_at;
                          if(jobInfo.job.companyinfo){
                              //  if(jobInfo.job.companyinfo.location)currentJob.location = jobInfo.job.companyinfo.location;
                              if(jobInfo.job.companyinfo.logo)currentJob.logo = jobInfo.job.companyinfo.logo;
                              if(jobInfo.job.companyinfo.org_name)currentJob.company_name = jobInfo.job.companyinfo.org_name;
                          }

                      }
                      this.appliedJobs.push(currentJob);
                }

              }
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
          this.jobApi.getJobList(this.currentPage).subscribe(
              (res: any) => {
                this.getAppliedJobs(res);
                  this.totalPages = ceil(
                      res?.data?.total / res?.data?.per_page
                  );
                  this.loading = false;
              },
              (error) => {
                  console.log('Error fetching all jobs:', error);
              }
          );
      }
  }

  nextPage() {
      this.loading = true;

      this.document.body.scrollTop = 0;
      this.document.documentElement.scrollTop = 0;

      if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.jobApi.getJobList(this.currentPage).subscribe(
              (res: any) => {
                  this.getAppliedJobs(res);
                  this.totalPages = ceil(
                      res?.data?.total / res?.data?.per_page
                  );
                  this.loading = false;
              },
              (error) => {
                  console.log('Error fetching all jobs:', error);
              }
          );
      }
  }

  goToPage(page: number | string) {
      if (typeof page === 'number') {
          this.loading = true;
          this.currentPage = page;

          this.document.body.scrollTop = 0;
          this.document.documentElement.scrollTop = 0;

          this.jobApi.getJobList(this.currentPage).subscribe(
              (res: any) => {
                  this.getAppliedJobs(res);
                  this.totalPages = ceil(
                      res?.data?.total / res?.data?.per_page
                  );
                  this.loading = false;
              },
              (error) => {
                  console.log('Error fetching all jobs:', error);
              }
          );
      }
  }

}

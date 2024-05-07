import { Component } from '@angular/core';
import { JobsService } from 'app/modules/landing/jobs/services/jobs.service';
import { GetJobListService } from '../../services/get-job-list.service';
import { Router } from '@angular/router';
import { EmployerProfileService } from '../../services/profile-edit.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  jobs:any[] = [];
  loading:boolean = false;
  currentPage = 1;
  empID:any;
  cntPostedJob:number = 0;
  cntJobApplication:number = 0;
  cntShortlisted:number = 0;
  cntJobReadyProgramme:number = 0;

  constructor(
       private jobList: JobsService,
       private dashboardApi: EmployerProfileService ,
       private _getJobListApi: GetJobListService,
       private _router:Router
  ){}

  ngOnInit(){
    this.empID = localStorage.getItem('user-id');
    this.loading = true;

   

    this.dashboardApi.getDashboardData().subscribe( (res:any)=>{
       
        this.loading = false;
        if(res.status && res.status == true){
              this.cntPostedJob = res?.data?.total_posted_job;
              this.cntJobApplication = res?.data?.total_job_applications;
              this.cntShortlisted = res?.data?.total_shortlisted_users;
              this.cntJobReadyProgramme = res?.data?.total_jobready_programs
              this.jobs = res?.data?.recently_posted_published_jobs;
        }
        
    })


  }

  goToJobs(){
    this._router.navigate(['jobs']);
  }

  displayJobDetails(id:any) {
    this._router.navigate(['jobs', id]);
  }
}

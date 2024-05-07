import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from 'app/modules/landing/jobs/services/jobs.service';
import { GetProfileDataService } from '../../services/get-profile-data.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

    jobs:any[] = [];
    loading:boolean = false;
    cntAppliedJobs:number = 0;
    cntFavJobs:number = 0;
    
    constructor(
         private dashboardApi: GetProfileDataService,
         private _router:Router
    ){}

    ngOnInit(){
        this.loading = true;
        this.dashboardApi.getDashboardData().subscribe((res: any) => {
                if(res.status && res.status == true){
                    this.jobs = res?.data?.recently_posted_published_jobs;
                    this.cntAppliedJobs = res?.data?.total_applied_job;
                    this.cntFavJobs = res?.data?.total_favourite_job;   
                }
                this.loading = false;
          },
          (error) => {
              console.log('Error fetching all jobs:', error);
          }
        );
    }

    goToJobs(){
        this._router.navigate(['jobs']);
    }

    displayJobDetails(id:any) {
        this._router.navigate(['jobs', id]);
    }

}

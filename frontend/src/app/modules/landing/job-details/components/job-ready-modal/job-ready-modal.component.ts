import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { JobsService } from 'app/modules/landing/jobs/services/jobs.service';
import { EventService } from 'app/shared/services/event.service.service';
import { EventData } from 'app/modules/landing/jobseeker/models/event-data';

@Component({
  selector: 'app-job-ready-modal',
  templateUrl: './job-ready-modal.component.html',
  styleUrls: ['./job-ready-modal.component.scss']
})
export class JobReadyModalComponent {
    jobId:any;
    jobTitle:string;
    loading:boolean = false;

    constructor(
        private _router:Router,
        private eventService: EventService,
        private dialogRef:DialogRef,
        private jobApi: JobsService
    ){}

    ngOnInit(){
      this.jobId = localStorage.getItem('job-id');
      this.jobTitle = localStorage.getItem('job-title');
      
    }

    addJobReadyProgramme(){
      this.jobApi.addJobReadyProgramme(this.jobId, this.jobTitle).subscribe( (res:any)=>{
        if(res.status && res.status == true){
              this.eventService.jobReadyProgramme("job-ready-programme", "add", res.data); 
              this.cancelModal();
        }
      })  
      this.cancelModal();
    }

    cancelModal(){
      this.dialogRef.close();
    }

    ngOnDestroy(){
        localStorage.removeItem('job-id');
        localStorage.removeItem('job-title');
    }


}

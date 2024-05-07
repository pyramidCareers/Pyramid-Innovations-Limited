import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'app/shared/services/event.service.service';
import { JobsService } from 'app/modules/landing/jobs/services/jobs.service';

@Component({
  selector: 'app-delete-job-ready-programme',
  templateUrl: './delete-job-ready-programme.component.html',
  styleUrls: ['./delete-job-ready-programme.component.scss']
})
export class DeleteJobReadyProgrammeComponent {

  loading:boolean = false;
  jobId:any;
 

  constructor(
       private dialogRef: MatDialogRef<any>,
       private jobApi: JobsService,
       private eventService: EventService,
  ){}

  ngOnInit(){
    this.jobId = localStorage.getItem('job-id');
  }

  

  remove(){
      this.jobApi.removeJobReadyProgramme(this.jobId).subscribe( (res:any)=>{
          
          if(res.status && res.status==true){
             this.eventService.jobReadyProgramme("job-ready-programme", "remove", res.data);  
          }
          this.cancelModal();
      })
  }


  cancelModal(){
      this.dialogRef.close();
  }

}

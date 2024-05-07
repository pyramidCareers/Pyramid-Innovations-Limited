import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'app/shared/services/event.service.service';
import { JobsService } from 'app/modules/landing/jobs/services/jobs.service';

@Component({
  selector: 'app-delete-job-ready-course',
  templateUrl: './delete-job-ready-course.component.html',
  styleUrls: ['./delete-job-ready-course.component.scss']
})
export class DeleteJobReadyCourseComponent {
  loading:boolean = false;
  courseId:any;
  jobId:any;

  constructor(
       private dialogRef: MatDialogRef<any>,
       private jobApi: JobsService,
       private eventService: EventService,
  ){}

  ngOnInit(){
      this.courseId = localStorage.getItem('course-id');
      this.jobId = localStorage.getItem('job-id');
      console.log("Here course id: ", this.courseId, "Job Id: ", this.jobId);
      
  }

  ngOnDestroy(){
      localStorage.removeItem('apply-fee-id');
  }

  remove(){
      this.jobApi.removeJobReadyCourse(this.jobId, this.courseId).subscribe( (res:any)=>{
              if(res.status && res.status==true){
                 this.eventService.jobReadyCourse("job-ready-course", "remove", res.data);  
              }
              this.cancelModal();
      })
  }


  cancelModal(){
      this.dialogRef.close();
  }
}

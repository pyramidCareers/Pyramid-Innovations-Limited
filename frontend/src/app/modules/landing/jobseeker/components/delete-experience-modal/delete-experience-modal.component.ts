import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Experience } from '../../models/experience';
import { ExperienceService } from '../../services/experience.service';
import { EventService } from 'app/shared/services/event.service.service';

@Component({
  selector: 'app-delete-experience-modal',
  templateUrl: './delete-experience-modal.component.html',
  styleUrls: ['./delete-experience-modal.component.scss']
})
export class DeleteExperienceModalComponent {

  experience:Experience = {} as Experience;
  loading:boolean = false;
  

  constructor(
    private dialogRef: MatDialogRef<any>,
    private experienceApi: ExperienceService,
    private eventService: EventService,
  ){}



  cancelModal(){
    this.dialogRef.close();
  }

 
 ngOnInit(){
    this.setVal();
 }
 

 remove(){
    this.loading = true;
    this.experienceApi.removeExperience(this.experience.id).subscribe( (res)=>{
      this.loading = false;
      if(res.status && res.status==true){
        if(res.data ){
            this.eventService.jobSeekerData("experience", "remove", res.data); 
        }
      
      }
        this.dialogRef.close();
    });

 }

setVal() {
  this.experience.id = localStorage.getItem('item-id');
  this.experience.title = localStorage.getItem('designation') || '';
  this.experience.organization = localStorage.getItem('organization') || '';
  this.experience.job_description = localStorage.getItem('job_description') || '';
  
  const startDate = localStorage.getItem('start_date');
  this.experience.started_at = startDate ? new Date(startDate).toISOString().substring(0, 10) : '';

  const endDate = localStorage.getItem('end_date');
  this.experience.ended_at = endDate ? new Date(endDate).toISOString().substring(0, 10) : '';
}

ngOnDestroy(){
  this.unsetVal();
}

unsetVal(){
  localStorage.removeItem('item-id');
  localStorage.removeItem('designation');
  localStorage.removeItem('organization');
  localStorage.removeItem('job_description');
  localStorage.removeItem('start_date');
  localStorage.removeItem('end_date');
}



}

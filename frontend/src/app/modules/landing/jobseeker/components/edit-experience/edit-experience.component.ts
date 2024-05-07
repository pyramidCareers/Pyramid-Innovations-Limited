import { Component } from '@angular/core';
import { ExperienceService } from '../../services/experience.service';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'app/shared/services/event.service.service';
import { Experience } from '../../models/experience';



@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.scss']
})
export class EditExperienceComponent {
  experience:Experience = {} as Experience;
  loading:boolean = false;



  constructor(
    private experienceApi: ExperienceService,
    private eventService: EventService,
    private dialogRef: MatDialogRef<any>
 ){}  

 ngOnInit(){
    this.setVal();
 }
 edit(){
    this.loading = true;
    this.experienceApi.editExperience(this.experience, this.experience.id).subscribe( (res)=>{
      this.loading = false;
      if(res.status && res.status==true){
        if(res.data ){
            this.eventService.jobSeekerData("experience", "edit", res.data); 
        }
      
      }
        this.dialogRef.close();
    });

    this.dialogRef.close();
 }


setVal() {
  this.experience.id = localStorage.getItem('item-id');
  this.experience.title = localStorage.getItem('designation') || '';
  this.experience.organization = localStorage.getItem('organization') || '';
  this.experience.job_description = localStorage.getItem('job_description') || '';
 
  if( !this.experience.job_description || this.experience.job_description == 'undefined' ){
      this.experience.job_description = '';
  }
  
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

  isValidated(){
    if(!this.experience.title || !this.experience.organization || !this.experience.started_at || !this.experience.ended_at)return false;
    return true;
  }

}

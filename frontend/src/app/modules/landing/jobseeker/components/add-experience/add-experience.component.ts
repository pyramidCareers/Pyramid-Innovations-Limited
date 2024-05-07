import { Component } from '@angular/core';
import { EducationService } from '../../services/education.service';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'app/shared/services/event.service.service';
import { Experience } from '../../models/experience';
import { ExperienceService } from '../../services/experience.service';


@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.scss']
})
export class AddExperienceComponent {
  constructor(
    private experienceApi: ExperienceService,
    private eventService: EventService,
    private dialogRef: MatDialogRef<any>
 ){}  

 experience:Experience = {} as Experience;
 loading:boolean = false;


 submit(){
    this.loading = true;
    this.experienceApi.addExperience(this.experience).subscribe( (res:any)=>{
      this.loading = false;
      if(res.status && res.status==true){
         if(res.data){
          this.eventService.jobSeekerData("experience", "add", res.data); 
         }
      }
      this.dialogRef.close();
    })
    
   
 }


 isValidated(){
     if(!this.experience.title || !this.experience.organization || !this.experience.started_at || !this.experience.ended_at)return false;
     return true;
 }

}

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SkillService } from '../../services/skill.service';
import { ExperienceService } from '../../services/experience.service';
import { EventService } from 'app/shared/services/event.service.service';
import { Skill } from '../../models/skill';

@Component({
  selector: 'app-delete-skill-modal',
  templateUrl: './delete-skill-modal.component.html',
  styleUrls: ['./delete-skill-modal.component.scss']
})
export class DeleteSkillModalComponent {
   skill:Skill = {} as Skill;
   loading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<any>,
    private skillApi: SkillService,
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
      this.skillApi.removeSkill(this.skill.id).subscribe( (res)=>{
        this.loading = false;
        if(res.status && res.status==true){
          if(res.data ){
              this.eventService.jobSeekerData("skill", "remove", res.data); 
          }
        
        }
          this.dialogRef.close();
      });

 }

setVal() {
   this.skill.id = localStorage.getItem('item-id');
   this.skill.title = localStorage.getItem('skill');
}

ngOnDestroy(){
  this.unsetVal();
}

unsetVal(){
  localStorage.removeItem('item-id');
  localStorage.removeItem('skill');
 
}


}

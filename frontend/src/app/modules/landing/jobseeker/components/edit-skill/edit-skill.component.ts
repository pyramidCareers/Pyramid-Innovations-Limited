import { Component, Input } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'app/shared/services/event.service.service';
import { Skill } from '../../models/skill';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.scss']
})
export class EditSkillComponent {
   
    skill:Skill = {} as Skill;

    title:string = "";
    loading:boolean = false;

    ngOnInit(){
      this.title = localStorage.getItem('skill');
      this.skill.id = localStorage.getItem('item-id');
    }

    ngOnDestroy(){
      this.unsetVal();
    }

    constructor(
      private skillApi: SkillService,
      private eventService: EventService,
      private dialogRef: MatDialogRef<any>
   ){}  

    edit(){
          this.loading = true;
          this.skill.title = this.title;
          this.skillApi.editSkill(this.skill.title, this.skill.id).subscribe( (res)=>{
              this.loading = false;
              if(res.status && res.status==true){
                if(res.data ){
                    this.eventService.jobSeekerData("skill", "edit", res.data); 
                }
              
              }
              this.dialogRef.close();
          });
        
    }

    unsetVal(){
      localStorage.removeItem('skill');
      localStorage.removeItem('item-id');
    }

    isValidated(){
        if( this.title == '' ){
            return false;
        }
        return true;
    }



  }

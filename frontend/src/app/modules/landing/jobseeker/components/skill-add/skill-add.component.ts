import { Component } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'app/shared/services/event.service.service';

@Component({
  selector: 'app-skill-add',
  templateUrl: './skill-add.component.html',
  styleUrls: ['./skill-add.component.scss']
})
export class SkillAddComponent {

    constructor(
       private skillApi: SkillService,
       private eventService: EventService,
       private dialogRef: MatDialogRef<any>
    ){}  

    skill:string = "";
    loading:boolean = false;
   

    submit(){

        this.loading = true;
        this.skillApi.addSkill(this.skill).subscribe( (res)=>{
            this.loading = false;
            if(res.status && res.status==true){
                if(res.data ){
                    this.eventService.jobSeekerData("skill", "add", res.data); 
                }
               
            }
           
            this.dialogRef.close();
        });
      
    }


    isValidated(){
        if( this.skill == '' ){
             return false;
        }
        return true;
    }

}

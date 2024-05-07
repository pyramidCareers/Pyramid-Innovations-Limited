import { Component } from '@angular/core';
import { EducationService } from '../../services/education.service';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'app/shared/services/event.service.service';
import { Education } from '../../models/education';


@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.scss']
})
export class AddEducationComponent {
  constructor(
    private educationApi: EducationService,
    private eventService: EventService,
    private dialogRef: MatDialogRef<any>
 ){}  

 education:Education = {} as Education;
 loading:boolean = false;


 submit(){
     this.loading = true;
     this.educationApi.addEducation(this.education).subscribe( (res)=>{
         this.loading = false;
         if(res.status && res.status==true){
             if(res.data ){
                 this.eventService.jobSeekerData("education", "add", res.data); 
             }
            
         }
        
         this.dialogRef.close();
     });
   
 }

 isValidated(){
  if(!this.education.title || !this.education.institution || !this.education.year || !this.education.grade_type || !this.education.result)return false;
  return true;
}

}

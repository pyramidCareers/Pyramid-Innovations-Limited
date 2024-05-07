import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Education } from '../../models/education';
import { EducationService } from '../../services/education.service';
import { EventService } from 'app/shared/services/event.service.service';

@Component({
  selector: 'app-delete-education-modal',
  templateUrl: './delete-education-modal.component.html',
  styleUrls: ['./delete-education-modal.component.scss']
})
export class DeleteEducationModalComponent {
 
  education:Education = {} as Education;
  loading:boolean = false;

  constructor(
    private dialogRef: MatDialogRef<any>,
    private educationApi: EducationService,
    private eventService: EventService,
  ){}



  cancelModal(){
    this.dialogRef.close();
  }

 
  ngOnInit(){
    this.setVal();
 }

 setVal() {
  this.education.id = localStorage.getItem('item-id');
  
 }
 

 remove(){
    this.loading = true;
    this.educationApi.removeEducation(this.education.id).subscribe( (res)=>{
      this.loading = false;
      if(res.status && res.status==true){
        if(res.data ){
            this.eventService.jobSeekerData("education", "remove", res.data); 
        }
      
      }
        this.dialogRef.close();
    });

 }


ngOnDestroy(){
  this.unsetVal();
}

unsetVal(){
  localStorage.removeItem('item-id');
  localStorage.removeItem('title');
  localStorage.removeItem('institution');
  localStorage.removeItem('year');
  localStorage.removeItem('result');
  localStorage.removeItem('grade_type');
  localStorage.removeItem('total_cgpa');
  localStorage.removeItem('letter_marks');
}

}

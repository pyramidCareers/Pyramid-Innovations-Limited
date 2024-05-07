import { Component, Input } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'app/shared/services/event.service.service';
import { Education } from '../../models/education';
import { EducationService } from '../../services/education.service';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.scss']
})
export class EditEducationComponent {
  education:Education = {} as Education;
  loading:boolean = false;

  id:any;
  title:string;
  year:string;
  institution:string;
  result:string;
  grade_type:string;
  letter_marks:any;
  total_cgpa:any;


  constructor(
    private educationApi: EducationService,
    private eventService: EventService,
    private dialogRef: MatDialogRef<any>
 ){}  

 ngOnInit(){
    this.setVal();
 }
 
 edit(){
     this.education.id=this.id;
     this.education.title=this.title;
     this.education.year=this.year;
     this.education.institution= this.institution;
     this.education.result=this.result;   
     this.education.grade_type = this.grade_type;
     if(this.total_cgpa)this.education.total_cgpa = this.total_cgpa;
     if(this.letter_marks)this.education.letter_marks = this.letter_marks;

    this.loading = true;
    this.educationApi.editEducation(this.education, this.education.id).subscribe( (res)=>{
      this.loading = false;
      if(res.status && res.status==true){
        if(res.data ){
            this.eventService.jobSeekerData("education", "edit", res.data); 
        }
      
      }
        this.dialogRef.close();
    });

    this.dialogRef.close();
 }



  setVal(){
    this.id = localStorage.getItem('item-id');
    this.title = localStorage.getItem('title');
    this.institution = localStorage.getItem('institution');
    this.year = localStorage.getItem('year');
    this.result = localStorage.getItem('result');
    this.grade_type = localStorage.getItem('grade_type');
    this.total_cgpa = localStorage.getItem('total_cgpa');
    if( !this.total_cgpa || this.total_cgpa == 'undefined' ){
       this.total_cgpa = '';
    }
   
    this.letter_marks = localStorage.getItem('letter_marks');
    if( !this.letter_marks || this.letter_marks == 'undefined' ){
      this.letter_marks = '';
    }
  }


  isValidated(){
    if(!this.title || !this.institution || !this.year || !this.grade_type || !this.result)return false;
    return true;
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
    localStorage.removeItem('letter_marks');
    localStorage.removeItem('division');
    localStorage.removeItem('total_cgpa');
  }

 

}

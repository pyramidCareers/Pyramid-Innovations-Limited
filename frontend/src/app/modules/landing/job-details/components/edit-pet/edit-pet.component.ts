import { Component } from '@angular/core';
import { PreEmploymentTestService } from 'app/modules/landing/jobs/services/pre-employment-test.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course';
import { MatDialog } from '@angular/material/dialog';
import { SuccessEditPetComponent } from '../success-edit-pet/success-edit-pet.component';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.scss']
})

export class EditPetComponent {
//   jobId:any;
//   conditionId: any;
//   condition_value: any;
//   condition_description: any;
//   selectedCourseId:number;
//   selectedCourse:Course = {} as Course;
//   searchText: string = '';
//   courses: Course[] = [];
//   filteredCourses:Course[] = [];

//   constructor(
//       private _route: ActivatedRoute,
//       private petApi: PreEmploymentTestService,
//       private dialog: MatDialog
//   ){
      
//             this.jobId = this._route.snapshot.params['id'];
//             this.conditionId = this._route.snapshot.params['conditionId'];

//             this.petApi.getCourses().subscribe( (res:any)=>{
                    
//                   this.courses = res?.courses;
//                   this.filteredCourses = this.courses;

//                   this.petApi.getPET(this.conditionId).subscribe( (response:any)=>{
//                         this.selectedCourseId = response?.data.condition_value;
                       
//                         for(let course of this.courses){
//                             if(course.id == this.selectedCourseId){
//                                   this.selectedCourse = course;
                                  
//                             }
//                         }
//                   })
//             })
        
//   }


//   savePET(){

//     this.condition_value = this.selectedCourseId; 
    
//     for(let course of this.courses){
//           if(course.id == this.selectedCourseId){
//               this.condition_description = course.fullname 
//           }
//     }

//     this.petApi.editPET(this.conditionId, this.jobId, this.condition_value, this.condition_description).subscribe( (res:any)=>{
//             if(res.status && res.status == true){
//                    this.dialog.open(SuccessEditPetComponent);
//             }
//     })
//   }

//   filterCourses() {
//       this.filteredCourses = this.courses.filter(course => 
//         course.fullname.toLowerCase().includes(this.searchText.toLowerCase())
//       );
//   }

//   createCourse(){
//       const categoryId:any = 2;
//       const create_course_url = environment.moodle_base_URL + "/course/edit.php?category=" + categoryId;
//       window.open(create_course_url, "_blank");
//   }

}
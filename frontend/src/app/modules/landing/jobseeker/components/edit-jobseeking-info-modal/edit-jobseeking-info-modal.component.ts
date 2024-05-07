import { Component } from '@angular/core';
import { EventService } from 'app/shared/services/event.service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Education } from '../../models/education';
import { Profile } from '../../models/profile';
import { UpdateProfileService } from '../../services/update-profile.service';

@Component({
  selector: 'app-edit-jobseeking-info-modal',
  templateUrl: './edit-jobseeking-info-modal.component.html',
  styleUrls: ['./edit-jobseeking-info-modal.component.scss']
})
export class EditJobseekingInfoModalComponent {
  education:Education = {} as Education;
  profile:Profile = {} as Profile;
  loading:boolean = false;


  constructor(
      private eventService: EventService,
      private dialogRef: MatDialogRef<any>,
      private profileApi: UpdateProfileService 
  ){}  

 ngOnInit(){
    this.setVal();
 }
 edit(){
  this.loading = true;
      this.profileApi.updateProfile(this.profile).subscribe( (res:any)=>{
        this.loading = false;
        if(res.status && res.status==true){
              if(res.data ){
                  this.eventService.jobSeekerData("jobseekingInfo", "edit", res.data); 
              }
            
            }
              this.dialogRef.close();
      })
  
 }

 
  setVal(){
      this.profile.currency = localStorage.getItem('currency') ;
      if(this.profile.currency == "undefined" || !this.profile.currency || this.profile.currency == "null")this.profile.currency = "";

      this.profile.current_notice_period = localStorage.getItem('current_notice_period') ;
      if(this.profile.current_notice_period == "undefined" || !this.profile.current_notice_period ||  this.profile.current_notice_period == "null")this.profile.current_notice_period = 0;

      this.profile.current_profession = localStorage.getItem('current_profession') ;
      if(this.profile.current_profession == "undefined" || !this.profile.current_profession || this.profile.current_profession == "null")this.profile.current_profession = "";

      this.profile.industry = localStorage.getItem('industry') ;
      if(this.profile.industry == "undefined" || !this.profile.industry ||  this.profile.industry == "null")this.profile.industry = "";

      this.profile.speciality = localStorage.getItem('speciality') ;
      if(this.profile.speciality == "undefined" || !this.profile.speciality || this.profile.speciality == "null")this.profile.speciality = "";

      this.profile.field_of_study = localStorage.getItem('field_of_study') ;
      if(this.profile.field_of_study === "undefined" || !this.profile.field_of_study || this.profile.field_of_study == "null" )this.profile.field_of_study = "";

      this.profile.jobseeking_status = localStorage.getItem('jobseeking_status') ;
      if(this.profile.jobseeking_status == "undefined" || !this.profile.jobseeking_status || this.profile.jobseeking_status == "null")this.profile.jobseeking_status = "";

      this.profile.expected_salary = localStorage.getItem('expected_salary');
      if(this.profile.expected_salary == "undefined" || !this.profile.expected_salary || this.profile.expected_salary == "null")this.profile.expected_salary = "";
      
      this.profile.years_of_experience = localStorage.getItem('years_of_experience');
      if(this.profile.years_of_experience == "undefined" || !this.profile.years_of_experience || this.profile.years_of_experience == "null")this.profile.years_of_experience = "";
 
  }

  ngOnDestroy(){
      this.unsetVal();
  }

  unsetVal(){
    localStorage.removeItem('currency');
    localStorage.removeItem('current_notice_period');
    localStorage.removeItem('current_profession');
    localStorage.removeItem('industry');
    localStorage.removeItem('speciality');
    localStorage.removeItem('field_of_study');
    localStorage.removeItem('jobseeking_status');
    localStorage.removeItem('expected_salary');
    localStorage.removeItem('years_of_experience');
  }

  isValidated(){
   
    if(this.profile.jobseeking_status && this.profile.current_notice_period !== undefined &&
      this.profile.current_notice_period !== null && this.profile.expected_salary !== undefined &&
      this.profile.expected_salary !== null && this.profile.currency && 
      this.profile.years_of_experience !== null && this.profile.currency)return true;
    return false;  
  }

 
}

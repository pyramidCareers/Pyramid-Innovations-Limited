import { Component } from '@angular/core';
import { Education } from '../../models/education';
import { EducationService } from '../../services/education.service';
import { EventService } from 'app/shared/services/event.service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { BasicInfo } from '../../models/basic-info';
import { MatOptionModule } from '@angular/material/core';
import { UpdateBasicInfoService } from '../../services/update-basic-info.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-edit-basic-info-modal',
  templateUrl: './edit-basic-info-modal.component.html',
  styleUrls: ['./edit-basic-info-modal.component.scss']
})
export class EditBasicInfoModalComponent {
  
  profile:BasicInfo = {} as BasicInfo;
  loading:boolean = false;
   
  constructor(
    private updateBasicInfoApi: UpdateBasicInfoService,
    private eventService: EventService,
    private dialogRef: MatDialogRef<any>
 ){}  

  ngOnInit(){
      this.setVal();
  }
  edit(){
    this.loading = true;
    this.updateBasicInfoApi.updateBasicInfo(this.profile).subscribe( (res:any)=>{
      if(res.status && res.status==true){
            this.loading = false;
            if(res.data ){
                 this.eventService.jobSeekerData("jobseeker-basic", "edit", res.data); 
                 this.eventService.completeProfile('1');
                 localStorage.setItem("profile-completion", environment.jobseeker_profile_completion_code);
            }
          
      }
      this.dialogRef.close();

    })
    

      this.dialogRef.close();
  }

  onProfilePicUpload(event: any) {
    const file = event.target.files[0];
    this.profile.profile_pic = file;
    
  }

 

  setVal(){
    this.profile.firstname = localStorage.getItem('firstname');
    this.profile.lastname = localStorage.getItem('lastname');
    this.profile.phone = localStorage.getItem('phone');
    this.profile.profile_pic = localStorage.getItem('profile_pic');
    this.profile.gender = localStorage.getItem('gender');
    if(!this.profile.gender ||  this.profile.gender == 'undefined')this.profile.gender = '';
  }

  ngOnDestroy(){
    this.unsetVal();
  }

  unsetVal(){
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('phone');
    localStorage.removeItem('profile_pic');
    localStorage.removeItem('gender');
  }

  isValidated(){
    if(!this.profile.firstname  || !this.profile.lastname || !this.profile.phone || !this.profile.gender)return false;
    return true;
  }




}

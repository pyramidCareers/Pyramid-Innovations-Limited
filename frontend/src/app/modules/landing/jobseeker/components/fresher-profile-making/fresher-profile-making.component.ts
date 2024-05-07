import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../../models/profile';
import { UpdateProfileService } from '../../services/update-profile.service';
import { AddSkillService } from '../../services/add-skill.service';
import { GetProfileDataService } from '../../services/get-profile-data.service';

@Component({
  selector: 'app-fresher-profile-making',
  templateUrl: './fresher-profile-making.component.html',
  styleUrls: ['./fresher-profile-making.component.scss']
})
export class FresherProfileMakingComponent {

  firstName:string = localStorage.getItem('firstname');
  profile:Profile = {} as Profile;

  fieldOfStudy: string = '';
  companyIndustry: string = '';
  specialisation:string = '';
  skill1:string = '';
  skill2:string = '';
 
  showSecondPart: boolean = false;
  showThirdPart:boolean = false;
  showFourthdPart:boolean = false;
  visibilityContinueBtn:boolean = false;
  skillSection:boolean = false;
  showSkill1:boolean = false;
  showSkill2:boolean = false;

  constructor(
    private _router:Router,
    private profileApi: UpdateProfileService,
    private getProfileDataApi: GetProfileDataService,
    private skillApi:AddSkillService
  ){}

  ngOnInit(){
    this.getProfileDataApi.getProfileData(localStorage.getItem('user-id')).subscribe((res: any) => {
        this.setJobSeekerData(res?.data?.job_seeker);
    })
  }


  toggleSecondPart() {
      if (this.fieldOfStudy && this.fieldOfStudy.trim() !== '') {
         this.showSecondPart = true;
      }
  }

  toggleThirdPart(){
      if (this.skill1 && this.skill1.trim() !== '') {
        this.showThirdPart = true;
      }
  }


  displayContinueBtn(){

    if (this.skill2 && this.skill2.trim() !== '') {
       this.visibilityContinueBtn = true;
    }
  }

  displaySkillSection(){

    this.profile.field_of_study = this.fieldOfStudy;

    this.profileApi.updateProfile(this.profile).subscribe( (res:any)=>{
       this.skillSection = true;
    }) 
    
  }

  toggleSkill1(){
    if (this.skill1 && this.skill1.trim() !== '') {
       this.showSkill1 = true;
       this.skillApi.addSkill(this.skill1).subscribe( (res:any)=>{

       })
    }
  }

  toggleSkill2(){
    if (this.skill2 && this.skill2.trim() !== '') {
       this.showSkill2 = true;
       this.skillApi.addSkill(this.skill2).subscribe( (res:any)=>{
        
       })
    }
  }


  goTo(path:string){
    this._router.navigate([path]);
  }

  setJobSeekerData(data: any) {

    this.profile.currency = data.currency
    if(this.profile.currency == "undefined" || !this.profile.currency || this.profile.currency == "null")this.profile.currency = "";

    this.profile.current_notice_period = data.current_notice_period;
    if(this.profile.current_notice_period == "undefined" || !this.profile.current_notice_period ||  this.profile.current_notice_period == "null")this.profile.current_notice_period = 0;

    this.profile.current_profession = data.current_profession;
    if(this.profile.current_profession == "undefined" || !this.profile.current_profession || this.profile.current_profession == "null")this.profile.current_profession = "";

    this.profile.industry = data.industry;
    if(this.profile.industry == "undefined" || !this.profile.industry ||  this.profile.industry == "null")this.profile.industry = "";

    this.profile.speciality = data.speciality;
    if(this.profile.speciality == "undefined" || !this.profile.speciality || this.profile.speciality == "null")this.profile.speciality = "";

    this.profile.field_of_study = data.field_of_study;
    if(this.profile.field_of_study === "undefined" || !this.profile.field_of_study || this.profile.field_of_study == "null" )this.profile.field_of_study = "";

    this.profile.jobseeking_status = data.jobseeking_status;
    if(this.profile.jobseeking_status == "undefined" || !this.profile.jobseeking_status || this.profile.jobseeking_status == "null")this.profile.jobseeking_status = 1;

    this.profile.expected_salary = data.expected_salary;
    if(this.profile.expected_salary == "undefined" || !this.profile.expected_salary || this.profile.expected_salary == "null")this.profile.expected_salary = 0;

  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../../models/profile';
import { UpdateProfileService } from '../../services/update-profile.service';
import { GetProfileDataService } from '../../services/get-profile-data.service';

@Component({
    selector: 'app-uploading-cv',
    templateUrl: './uploading-cv.component.html',
    styleUrls: ['./uploading-cv.component.scss'],
})
export class UploadingCvComponent {

    showErrorMessage = false;
    loading: boolean = false;
    isFileSelected: boolean = false;
    profile: Profile = {} as Profile;
    isSubmitButtonShow: boolean = true;

    constructor(
        private _router: Router,
        private profileApi: UpdateProfileService,
        private getProfileDataApi: GetProfileDataService,
    ) {}

    

    ngOnInit(){
        this.getResume();
    }

    getResume(){
        this.getProfileDataApi.getProfileData(localStorage.getItem('user-id')).subscribe((res: any) => {
                this.setJobSeekerData(res?.data?.job_seeker);
                
                if (res.status) {
                    if (res.status == true) {
                        if (res.data) {
                            if(res.data.job_seeker){
                                    if(res.data.job_seeker.resume){
                                        this.profile.resume =  res.data.job_seeker.resume;
                                        
                                        
                                    }
                            }
                        }
                    }
                }
        })
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

    onResumeUpload(event: any) {
        const file = event.target.files[0];
        this.isFileSelected = true;
        this.profile.resume = file;
    }

    continueActionJobs() {
        if (this.isFileSelected && !this.showErrorMessage) {
            this.showErrorMessage = true;
        } else {
            this.goTo('/jobs');
        }
    }

    continueAction() {
        if (this.isFileSelected && !this.showErrorMessage) {
            this.showErrorMessage = true;
        } else {
            this.goTo('/');
        }
    }

    uploadCV() {
        this.loading = true;
        this.profileApi.updateProfile(this.profile).subscribe((res: any) => {
            this.isSubmitButtonShow = false;
            this.loading = false;
        });
    }

    goTo(path: string) {
        this._router.navigate([path]);
    }
}

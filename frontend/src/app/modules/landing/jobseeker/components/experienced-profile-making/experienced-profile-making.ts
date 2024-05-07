import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../../models/profile';
import { AddSkillService } from '../../services/add-skill.service';
import { JobSeekerProfileMakingSuggestion } from '../../services/jobseeker-profilemaking-suggestion';
import { UpdateProfileService } from '../../services/update-profile.service';
import { GetProfileDataService } from '../../services/get-profile-data.service';

@Component({
    selector: 'app-experienced-profile-making',
    templateUrl: './experienced-profile-making.html',
    styleUrls: ['./experienced-profile-making.scss'],
})
export class ExperiencedProfileMakingComponent {
    firstName: string = localStorage.getItem('firstname');
    profile: Profile = {} as Profile;


    jobTitle: string = '';
    companyIndustry: string = '';
    specialisation: string = '';

    skill1: string = '';
    skill2: string = '';

    showSecondPart: boolean = false;
    showThirdPart: boolean = false;
    showFourthdPart: boolean = false;
    showFifthPart: boolean = false;
    showSkill1: boolean = false;
    showSkill2: boolean = false;
    visibilityContinueBtn: boolean = false;
    skillSection: boolean = false;

    hideError: boolean = false;
    resultsSkills1: string[] = [];
    resultsSkills2: string[] = [];
    resultsIndustry: string[] = [];
    resultsSpeciality: string[] = [];
    resultsProfession: string[] = [];

    
    constructor(
        private _router: Router,
        private skillApi: AddSkillService,
        private profileApi: UpdateProfileService,
        private getProfileDataApi: GetProfileDataService,
        private _jobseekerSuggestion: JobSeekerProfileMakingSuggestion
    ) {}

    ngOnInit(){
        this.getProfileDataApi.getProfileData(localStorage.getItem('user-id')).subscribe((res: any) => {
            this.setJobSeekerData(res?.data?.job_seeker);
        })
    }

    callProfessionAPI() {
        this._jobseekerSuggestion
            .professionSuggestion(this.jobTitle)
            .subscribe((res: any) => {
                this.resultsProfession = res;
            });
    }

    selectResult(result: string) {
        this.jobTitle = result; // Assign the selected result to the jobTitle field
        this.resultsProfession = []; // Clear the resultsProfession array to hide the dropdown
        this.showSecondPart = true;
    }

    callIndustryAPI() {
        this._jobseekerSuggestion
            .industrySuggestion(this.companyIndustry)
            .subscribe((res: any) => {
                this.resultsIndustry = res;
            });
    }

    selectResultIndustry(result: string) {
        this.companyIndustry = result; // Assign the selected result to the companyIndustry field
        this.resultsIndustry = []; // Clear the selectResultIndustry array to hide the dropdown
        this.showThirdPart = true;
    }

    callSpecialityAPI() {
        this._jobseekerSuggestion
            .specialitySuggestion(this.specialisation)
            .subscribe((res: any) => {
                this.resultsSpeciality = res;
            });
    }

    selectResultSpeciality(result: string) {
        this.specialisation = result; // Assign the selected result to the specialisation field
        this.resultsSpeciality = []; // Clear the resultsSpeciality array to hide the dropdown
        this.showFourthdPart = true;
    }

    callSkills1API() {
        this._jobseekerSuggestion
            .userSkillsSuggestion(this.skill1)
            .subscribe((res: any) => {
                this.resultsSkills1 = res;
            });
    }

    selectResultSkills1(result: string) {
        this.skill1 = result; // Assign the selected result to the skill1 field
        this.resultsSkills1 = []; // Clear the resultsSkills1 array to hide the dropdown
        this.skillApi.addSkill(this.skill1).subscribe((res: any) => {});
        this.showSkill1 = true;
    }

    callSkills2API() {
        this._jobseekerSuggestion
            .userSkillsSuggestion(this.skill2)
            .subscribe((res: any) => {
                this.resultsSkills2 = res;
            });
    }

    selectResultSkills2(result: string) {
        this.skill2 = result; // Assign the selected result to the skill2 field
        this.resultsSkills2 = []; // Clear the resultsSkills2 array to hide the dropdown
        this.skillApi.addSkill(this.skill2).subscribe((res: any) => {});
        this.showSkill2 = true;
    }

    toggleSecondPart() {
        if (this.jobTitle && this.jobTitle.trim() !== '') {
            this.showSecondPart = true;
        }
    }

    toggleThirdPart() {
        if (this.companyIndustry && this.companyIndustry.trim() !== '') {
            this.showThirdPart = true;
        }
    }

    toggleFourthPart() {
        if (this.specialisation && this.specialisation.trim() !== '') {
            this.showFourthdPart = true;
        }
    }

    toggleSkill1() {
        if (this.skill1 && this.skill1.trim() !== '') {
            this.skillApi.addSkill(this.skill1).subscribe((res: any) => {});
            this.showSkill1 = true;
        }
    }

    toggleSkill2() {
        if (this.skill2 && this.skill2.trim() !== '') {
            this.skillApi.addSkill(this.skill2).subscribe((res: any) => {});
            this.showSkill2 = true;
            this.hideError = true;
        }
    }

    displaySkillSection() {
        this.profile.current_profession = this.jobTitle;
        this.profile.industry = this.companyIndustry;
        this.profile.speciality = this.specialisation;

        this.profileApi.updateProfile(this.profile).subscribe((res: any) => {
            this.skillSection = true;
        });
    }

    goTo(path: string) {
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

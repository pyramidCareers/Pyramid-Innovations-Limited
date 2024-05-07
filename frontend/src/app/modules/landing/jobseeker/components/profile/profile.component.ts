import { Component } from '@angular/core';
import { GetProfileDataService } from '../../services/get-profile-data.service';
import { Profile } from '../../models/profile';
import { Experience } from '../../models/experience';
import { Education } from '../../models/education';
import { MatDialog } from '@angular/material/dialog';
import { Certificate } from '../../models/certificate';
import { SkillAddComponent } from '../skill-add/skill-add.component';
import { EventService } from 'app/shared/services/event.service.service';
import { Skill } from '../../models/skill';
import { EditSkillComponent } from '../edit-skill/edit-skill.component';
import { EventData } from '../../models/event-data';
import { AddExperienceComponent } from '../add-experience/add-experience.component';
import { AddEducationComponent } from '../add-education/add-education.component';
import { EditEducationComponent } from '../edit-education/edit-education.component';
import { EditExperienceComponent } from '../edit-experience/edit-experience.component';
import { EditBasicInfoModalComponent } from '../edit-basic-info-modal/edit-basic-info-modal.component';
import { EditJobseekingInfoModalComponent } from '../edit-jobseeking-info-modal/edit-jobseeking-info-modal.component';
import { DeleteExperienceModalComponent } from '../delete-experience-modal/delete-experience-modal.component';
import { DeleteEducationModalComponent } from '../delete-education-modal/delete-education-modal.component';
import { DeleteSkillModalComponent } from '../delete-skill-modal/delete-skill-modal.component';
import { ActivatedRoute } from '@angular/router';
import { ExtraCurricular } from '../../models/extra-curricular';
import { environment } from 'environments/environment';
import { LoggedUserGuard } from 'app/shared/services/logged-user-guard.guard';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
    profile: Profile = {} as Profile;
    fullName: string;
    userID: any;
    isOwnProfile: boolean = false;
    gender: string;
    loading: boolean = false;
    experiences: Experience[] = [];
    educations: Education[] = [];
    skills: Skill[] = [];
    certificates: Certificate[] = [];
    profileCompleted: boolean;
    extraCurricularActivities: ExtraCurricular[] = [];

    constructor(
        private profileApi: GetProfileDataService,
        private dialog: MatDialog,
        private eventService: EventService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.loading = true;
        this.profileCompleted = true;
        this.userID = this.route.snapshot.params['id'];
        if (this.userID == localStorage.getItem('user-id'))
            this.isOwnProfile = true;

        this.profileApi.getProfileData(this.userID).subscribe((res: any) => {
            this.loading = false;
            if (res.status) {
                if (res.status == true) {
                    if (res.data) {
                        this.setBasciData(res.data);
                    }
                }
            }
        });

        this.eventService.event$.subscribe((data: EventData) => {
            if (data.action === 'add') {
                if (data.source === 'skill') this.skills.push(data.obj);
                if (data.source === 'education') this.educations.push(data.obj);
                if (data.source === 'experience')
                    this.experiences.push(data.obj);
            }

            if (data.action === 'edit') {
                let index: any;
                if (data.source === 'skill') {
                    if (data.obj.id)
                        index = this.skills.findIndex(
                            (skill) => skill.id === data.obj.id
                        );
                    if (index != -1) {
                        this.skills[index] = data.obj;
                    }
                }

                if (data.source === 'education') {
                    if (data.obj.id)
                        index = this.educations.findIndex(
                            (ed) => ed.id === data.obj.id
                        );
                    if (index != -1) {
                        this.educations[index] = data.obj;
                    }
                }
                if (data.source === 'experience') {
                    if (data.obj.id)
                        index = this.experiences.findIndex(
                            (exp) => exp.id === data.obj.id
                        );
                    if (index !== -1) {
                        this.experiences[index] = data.obj;
                    }
                }
                if (data.source === 'jobseeker-basic') {
                    if (data.obj.firstname)
                        this.profile.firstname = data.obj.firstname;
                    if (data.obj.lastname)
                        this.profile.lastname = data.obj.lastname;
                    if (data.obj.phone) this.profile.phone = data.obj.phone;
                    if (data.obj.profile_pic)
                        this.profile.profile_pic = data.obj.profile_pic;
                    this.fullName =
                        this.profile.firstname + ' ' + this.profile.lastname;
                    this.profile.gender = data.obj.gender;
                }

                if (data.source === 'jobseekingInfo') {
                    this.profile.jobseeking_status = data.obj.jobseeking_status;
                    this.profile.currency = data.obj.currency;
                    this.profile.current_notice_period =
                        data.obj.current_notice_period;
                    this.profile.expected_salary = data.obj.expected_salary;
                    this.profile.current_profession =
                        data.obj.current_profession;
                    this.profile.industry = data.obj.industry;
                    this.profile.speciality = data.obj.speciality;
                    this.profile.field_of_study = data.obj.field_of_study;
                    this.profile.years_of_experience = data.obj.years_of_experience;
                }
            }
            if (data.action === 'remove') {
                if (data.source === 'skill') {
                    const index = this.skills.findIndex(
                        (skill) => skill.id === data.obj.id
                    );
                    if (index != -1) {
                        this.skills.splice(index, 1);
                    }
                }

                if (data.source === 'education') {
                    const index = this.educations.findIndex(
                        (ed) => ed.id === data.obj.id
                    );
                    if (index != -1) {
                        this.educations.splice(index, 1);
                    }
                }

                if (data.source === 'experience') {
                    const index = this.experiences.findIndex(
                        (exp) => exp.id === data.obj.id
                    );
                    if (index != -1) {
                        this.experiences.splice(index, 1);
                    }
                }
            }

            if (data.source === 'profile') {
                if (data.obj === '1') this.profileCompleted = true;
                else this.profileCompleted = false;
            }
        });
    }

    editBasicInfo() {
        localStorage.setItem('firstname', this.profile.firstname);
        localStorage.setItem('lastname', this.profile.lastname);
        localStorage.setItem('phone', this.profile.phone);
        localStorage.setItem('profile_pic', this.profile.profile_pic);
        localStorage.setItem('gender', this.profile.gender);

        const dialog = this.dialog.open(EditBasicInfoModalComponent);
    }

    setBasciData(data: any) {
        if (data.firstname) this.profile.firstname = data.firstname;
        if (data.lastname) this.profile.lastname = data.lastname;
        this.fullName = this.profile.firstname + ' ' + this.profile.lastname;
        if (data.email) this.profile.email = data.email;
        if (data.gender) this.profile.gender = data.gender;
        if (!data.phone || data.phone == 'undefined') {
            this.profile.phone = '';
        } else {
            this.profile.phone = data.phone;
        }

        if (localStorage.getItem('oAuth-redirected') == '1') {
            if (this.profile.phone == '') {
                this.profileCompleted = false;
                localStorage.setItem('profile-completion', '983');
            } else {
                this.profileCompleted = true;
                localStorage.setItem(
                    'profile-completion',
                    environment.jobseeker_profile_completion_code
                );
            }
            localStorage.removeItem('oAuth-redirected');
        }

        if (data.profile_pic) this.profile.profile_pic = data.profile_pic;
        if (data.job_seeker) this.setJobSeekerData(data.job_seeker);
        if (data.users_skills) {
            this.profile.users_skills = data.users_skills;
            for (let skill of this.profile.users_skills) {
                let userSkill: Skill = {} as Skill;
                if (skill.id) userSkill.id = skill.id;
                if (skill.title) userSkill.title = skill.title;
                if (skill.title) this.skills.push(userSkill);
            }
            this.profile.users_skills = data.users_skills;
        }
        if (data.experiences) {
            this.profile.experiences = data.experiences;

            for (let exp of this.profile.experiences) {
                let experience: Experience = {} as Experience;
                if (exp.id) experience.id = exp.id;
                if (exp.organization)
                    experience.organization = exp.organization;
                if (exp.title) experience.title = exp.title;
                if (exp.started_at) experience.started_at = exp.started_at;
                if (exp.ended_at) experience.ended_at = exp.ended_at;
                if (exp.job_description)
                    experience.job_description = exp.job_description;
                this.experiences.push(experience);
            }
        }
        if (data.educations) {
            this.profile.educations = data.educations;

            for (let ed of this.profile.educations) {
                let education: Education = {} as Education;
                if (ed.id) education.id = ed.id;
                if (ed.institution) education.institution = ed.institution;
                if (ed.title) education.title = ed.title;
                if (ed.year) education.year = ed.year;
                if (ed.result) education.result = ed.result;
                this.educations.push(ed);
            }
        }

        if (data.certifications) {
            this.profile.certifications = data.certifications;

            for (let cert of this.profile.certifications) {
                let certificate: Certificate = {} as Certificate;
                if (cert.id) certificate.id = cert.id;
                if (cert.certificate_name)
                    certificate.certificate_name = cert.certificate_name;
                if (cert.issuing_organization)
                    certificate.issuing_organization =
                        cert.issuing_organization;
                if (cert.issue_date) certificate.issue_date = cert.issue_date;
                if (cert.expiration_date)
                    certificate.expiration_date = cert.expiration_date;
                if (cert.credential_id)
                    certificate.credential_id = cert.credential_id;
                if (cert.credential_url)
                    certificate.credential_url = cert.credential_url;

                this.certificates.push(cert);
            }
        }

        if (data.extracurriculars) {
            this.profile.extraCurricularActivities = data.extracurriculars;

            for (let act of this.profile.extraCurricularActivities) {
                let activity: ExtraCurricular = {} as ExtraCurricular;
                if (act.id) activity.id = act.id;
                if (act.organization_name)
                    activity.organization_name = act.organization_name;
                if (act.role) activity.role = act.role;
                if (act.category) activity.category = act.category;
                if (act.start_date) activity.start_date = act.start_date;
                if (act.end_date) activity.end_date = act.end_date;
                if (act.description) activity.description = act.description;

                this.extraCurricularActivities.push(act);
            }
        }
    }

    setJobSeekerData(data: any) {
        this.profile.jobseeking_status = data.jobseeking_status;
        if (data.expected_salary != undefined && data.expected_salary != null)
            this.profile.expected_salary = data.expected_salary;
        if (
            !this.profile.expected_salary ||
            this.profile.expected_salary == 'undefined' ||
            this.profile.expected_salary == 'null'
        ) {
            this.profile.expected_salary = '0';
        }
        if (data.currency) this.profile.currency = data.currency;

        this.profile.current_notice_period = data.current_notice_period;
        if (
            !this.profile.current_notice_period ||
            this.profile.current_notice_period == 'undefined' ||
            this.profile.current_notice_period == 'null'
        ) {
            this.profile.current_notice_period = '0';
        }
        if (data.current_profession)
            this.profile.current_profession = data.current_profession;
        if (data.industry) this.profile.industry = data.industry;
        if (data.speciality) this.profile.speciality = data.speciality;
        if (data.field_of_study)
            this.profile.field_of_study = data.field_of_study;
        if (data.resume) this.profile.resume = data.resume;
        if (data.years_of_experience) this.profile.years_of_experience = data.years_of_experience;
    }

    addSkill() {
        const dialog = this.dialog.open(SkillAddComponent);
    }

    editSkill(skill: Skill) {
        let dialogRef = this.dialog.open(EditSkillComponent);
        localStorage.setItem('item-id', skill.id);
        localStorage.setItem('skill', skill.title);
    }

    openDeleteSkillModal(skill: Skill) {
        let dialogRef = this.dialog.open(DeleteSkillModalComponent);
        localStorage.setItem('item-id', skill.id);
        localStorage.setItem('skill', skill.title);
    }

    addEducation() {
        const dialog = this.dialog.open(AddEducationComponent);
    }

    editEducation(ed: Education) {
        localStorage.setItem('item-id', ed.id);
        localStorage.setItem('title', ed.title);
        localStorage.setItem('institution', ed.institution);
        localStorage.setItem('year', ed.year);
        localStorage.setItem('result', ed.result);
        localStorage.setItem('grade_type', ed.grade_type);
        if (ed.total_cgpa) localStorage.setItem('total_cgpa', ed.total_cgpa);
        if (ed.letter_marks)
            localStorage.setItem('letter_marks', ed.letter_marks);

        let dialogRef = this.dialog.open(EditEducationComponent);
    }

    editExperience(exp: Experience) {
        localStorage.setItem('item-id', exp.id);
        localStorage.setItem('designation', exp.title);
        localStorage.setItem('organization', exp.organization);
        localStorage.setItem('job_description', exp.job_description);
        localStorage.setItem('start_date', exp.started_at);
        localStorage.setItem('end_date', exp.ended_at);

        let dialogRef = this.dialog.open(EditExperienceComponent);
    }

    addExperience() {
        const dialog = this.dialog.open(AddExperienceComponent);
    }

    openDeleteExpModal(exp: Experience) {
        localStorage.setItem('item-id', exp.id);
        localStorage.setItem('designation', exp.title);
        localStorage.setItem('organization', exp.organization);
        localStorage.setItem('job_description', exp.job_description);
        localStorage.setItem('start_date', exp.started_at);
        localStorage.setItem('end_date', exp.ended_at);
        const dialog = this.dialog.open(DeleteExperienceModalComponent);
    }

    openDeleteEduModal(ed: Education) {
        localStorage.setItem('item-id', ed.id);
        localStorage.setItem('title', ed.title);
        localStorage.setItem('institution', ed.institution);
        localStorage.setItem('year', ed.year);
        localStorage.setItem('result', ed.result);
        const dialog = this.dialog.open(DeleteEducationModalComponent);
    }

    editJobSeekingInfoInfo() {
        localStorage.setItem(
            'jobseeking_status',
            this.profile.jobseeking_status
        );
        localStorage.setItem('expected_salary', this.profile.expected_salary);
        localStorage.setItem('currency', this.profile.currency);
        localStorage.setItem(
            'current_notice_period',
            this.profile.current_notice_period
        );
        localStorage.setItem(
            'current_profession',
            this.profile.current_profession
        );
        localStorage.setItem('industry', this.profile.industry);
        localStorage.setItem('speciality', this.profile.speciality);
        localStorage.setItem('field_of_study', this.profile.field_of_study);
        localStorage.setItem('years_of_experience', this.profile.years_of_experience);

        let dialogRef = this.dialog.open(EditJobseekingInfoModalComponent);
    }

    showResume() {
        if (this.profile.resume) {
            const pdfUrl = this.profile.resume;
            window.open(pdfUrl, '_blank');
        }
    }
}

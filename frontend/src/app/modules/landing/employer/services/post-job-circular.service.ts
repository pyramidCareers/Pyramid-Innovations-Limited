import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { JobCircular } from '../models/job-circular';

@Injectable({
    providedIn: 'root',
})
export class PostJobCircularService {
    constructor(private http: HttpClient, private httpBackend: HttpBackend) {
        this.http = new HttpClient(httpBackend);
    }

    createJobCircular(job: JobCircular, empID: any): Observable<any> {
        let formData = new FormData();

        formData.append('employer_user_id', empID);
        formData.append('title', job.title);
        formData.append('description', job.description);
        formData.append('requirement_details', job.requirement_details);
        formData.append('additional_requirements', job.additional_requirements);
        formData.append('responsibilities', job.responsibilities);
        formData.append('category', job.category);
        formData.append('job_type', job.job_type);
        formData.append('experience_level', job.experience_level);
        formData.append('experience_lower_limit', job.experience_lower_limit);
        formData.append('experience_upper_limit', job.experience_upper_limit);
        formData.append('salary_upper_limit', job.salary_upper_limit);
        formData.append('salary_lower_limit', job.salary_lower_limit);
        formData.append('other_benefits', job.other_benefits);
        formData.append('location', job.location);
        formData.append('currency', job.currency);
        formData.append('company_site_link', job.company_site_link);
        formData.append('number_of_vacancies', job.number_of_vacancies);
        formData.append('application_deadline', job.application_deadline);

        const authToken = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(`${environment.base_URL}/api/job/create`, formData, {
                headers,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    editJobCircular(job: JobCircular, jobID: any, empID: any): Observable<any> {
        let formData = new FormData();

        formData.append('employer_user_id', empID);
        formData.append('title', job.title);
        formData.append('description', job.description);
        formData.append('requirement_details', job.requirement_details);
        formData.append('additional_requirements', job.additional_requirements);
        formData.append('responsibilities', job.responsibilities);
        formData.append('category', job.category);
        formData.append('job_type', job.job_type);
        formData.append('experience_level', job.experience_level);
        formData.append('experience_lower_limit', job.experience_lower_limit);
        formData.append('experience_upper_limit', job.experience_upper_limit);
        formData.append('salary_upper_limit', job.salary_upper_limit);
        formData.append('salary_lower_limit', job.salary_lower_limit);
        formData.append('other_benefits', job.other_benefits);
        formData.append('company_site_link', job.company_site_link);
        formData.append('location', job.location);
        formData.append('currency', job.currency);
        formData.append('number_of_vacancies', job.number_of_vacancies);
        formData.append('application_deadline', job.application_deadline);
        formData.append('_method', 'put');

        const authToken = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(`${environment.base_URL}/api/job/update/${jobID}`, formData, {
                headers,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }
}

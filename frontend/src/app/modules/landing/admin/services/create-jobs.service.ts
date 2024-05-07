import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { JobCircular } from '../../employer/models/job-circular';

@Injectable({
    providedIn: 'root',
})
export class AdminCreateJobService {
    constructor(private http: HttpClient) {}

    searchEmployer(onTyping: string): Observable<any> {
        return this.http
            .get(`${environment.base_URL}/api/employers/search/${onTyping}`)
            .pipe(
                catchError((error: any) => {
                    console.log('error', error);
                    // Handle the error as needed, e.g., show an error message or perform specific actions

                    // Return an observable with the error to propagate it further
                    return of(error);
                })
            );
    }

    AdminCreateJobCircular(job: JobCircular, empID: any): Observable<any> {
        let formData = new FormData();

        formData.append('title', job.title);
        formData.append('category', job.category);
        formData.append('job_type', job.job_type);
        formData.append('employer_user_id', empID);
        formData.append('description', job.description);
        formData.append('responsibilities', job.responsibilities);
        formData.append('experience_level', job.experience_level);
        formData.append('requirement_details', job.requirement_details);
        formData.append('additional_requirements', job.additional_requirements);
        formData.append('experience_lower_limit', job.experience_lower_limit);
        formData.append('experience_upper_limit', job.experience_upper_limit);
        formData.append('salary_upper_limit', job.salary_upper_limit);
        formData.append('salary_lower_limit', job.salary_lower_limit);
        formData.append('other_benefits', job.other_benefits);
        formData.append('location', job.location);
        formData.append('currency', job.currency);

        return this.http
            .post(`${environment.base_URL}/api/admin/job/create`, formData, {})
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class JobFilteringService {

    constructor(private http: HttpClient, private router: Router) {}

    getFilteredJobList(currentPageNo:any, filteredJob:Job ): Observable<any> {

        
        let formData = new FormData();

        if( filteredJob.category ) formData.append('category',  filteredJob.category);
        if( filteredJob.title    ) formData.append('title',  filteredJob.title);
        if( filteredJob.org_name ) formData.append('org_name', filteredJob.org_name);
        if( filteredJob.location ) formData.append('location', filteredJob.location);
        if( filteredJob.job_type ) formData.append('job_type', filteredJob.job_type);
        if( filteredJob.experience_level ) formData.append('experience_level', filteredJob.experience_level);
        if( filteredJob.experience_lower_limit  ) formData.append('experience_lower_limit',  filteredJob.experience_lower_limit);
        if( filteredJob.experience_upper_limit  ) formData.append('experience_upper_limit',  filteredJob.experience_upper_limit);
        if( filteredJob.industry   ) formData.append('industry',  filteredJob.industry);
        if( filteredJob.date_posted  ) formData.append('date_posted',  filteredJob.date_posted);

        return this.http
              .post(`${environment.base_URL}/api/jobs/search?page=${currentPageNo}`, formData )
              .pipe(
                  switchMap((response: any) => {
                       return of(response);
              })
        );
    }


}

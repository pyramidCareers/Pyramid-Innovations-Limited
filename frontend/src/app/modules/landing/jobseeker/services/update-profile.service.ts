import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {


  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
  ) {
    this.http = new HttpClient(httpBackend);
  }

  updateProfile(profile:Profile): Observable<any> {
    let formData = new FormData();
  
    formData.append('_method', 'PUT');
    formData.append('jobseeking_status', profile.jobseeking_status);
    formData.append('expected_salary', profile.expected_salary);
    formData.append('currency', profile.currency);
    formData.append('current_notice_period', profile.current_notice_period);
    formData.append('current_profession', profile.current_profession);
    formData.append('industry', profile.industry);
    formData.append('speciality', profile.speciality);
    if(profile.resume)formData.append('resume', profile.resume);
    formData.append('field_of_study', profile.field_of_study);
    formData.append('years_of_experience', profile.years_of_experience);
   
  
    const userID = localStorage.getItem('user-id'); 
    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
    });

    return this.http.post(`${environment.base_URL}/api/jobseeker/update/user/${userID}`, formData, { headers }).pipe(
      switchMap((response: any) => {
        
        return of(response);
      })
    );
  }

}

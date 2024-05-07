import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../models/profile';
import { Experience } from '../models/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

 
  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
  ) {
    this.http = new HttpClient(httpBackend);
  }

  addExperience(experience:Experience): Observable<any> {
    let formData = new FormData();

    formData.append('title', experience.title);
    formData.append('started_at', experience.started_at);
    formData.append('ended_at', experience.ended_at);
    formData.append('organization', experience.organization);
    formData.append('job_description', experience.job_description);
  
    
    const userID = localStorage.getItem('user-id'); 
    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
    });

    return this.http.post(`${environment.base_URL}/api/jobseeker/user/${userID}/experience/create`, formData, { headers }).pipe(
        switchMap((response: any) => {
          
          return of(response);
        })
    );
  }

  editExperience(experience:Experience, experienceID:any): Observable<any> {
    let formData = new FormData();
  
    formData.append('_method', 'PUT');
    formData.append('title', experience.title);
    formData.append('started_at', experience.started_at);
    formData.append('ended_at', experience.ended_at);
    formData.append('organization', experience.organization);
    formData.append('job_description', experience.job_description);
  
   
    const userID = localStorage.getItem('user-id'); 
    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
    });

    return this.http.post(`${environment.base_URL}/api/jobseeker/user/${userID}/experience/update/${experienceID}`, formData, { headers }).pipe(
        switchMap((response: any) => {
          
          return of(response);
        })
    );
  }

  removeExperience( experienceID:any): Observable<any> {

    let formData = new FormData();
    formData.append('_method', 'DELETE');
    
    
    const userID = localStorage.getItem('user-id'); // Retrieve the userID dynamically
    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
    });

    return this.http.delete(`${environment.base_URL}/api/jobseeker/user/${userID}/experience/delete/${experienceID}`,  { headers }).pipe(
        switchMap((response: any) => {
          
          return of(response);
        })
    );
  }

}

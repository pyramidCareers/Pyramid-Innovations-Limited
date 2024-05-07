import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class SkillService {


  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
  ) {
    this.http = new HttpClient(httpBackend);
  }

  addSkill(skill:string): Observable<any> {
    let formData = new FormData();
  
    formData.append('title', skill)
  
    const userID = localStorage.getItem('user-id'); 
    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + authToken
    });

    return this.http.post(`${environment.base_URL}/api/jobseeker/user/${userID}/users_skills/create`, formData, { headers }).pipe(
        switchMap((response: any) => {
          
          return of(response);
        })
    );
  }

  editSkill(skill:string, skillID:any): Observable<any> {
    let formData = new FormData();
  
    formData.append('title', skill);
    formData.append('_method', 'PUT')
  
    const userID = localStorage.getItem('user-id'); 
    const authToken = localStorage.getItem('auth-token');

    
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + authToken
    });

    return this.http.post(`${environment.base_URL}/api/jobseeker/user/${userID}/users_skills/update/${skillID}`, formData, { headers }).pipe(
        switchMap((response: any) => {
          
          return of(response);
        })
    );
  }

  removeSkill( skillID:any): Observable<any> {
    let formData = new FormData();
  
    formData.append('_method', 'DELETE')
    

    const userID = localStorage.getItem('user-id'); 
    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
    });

    return this.http.delete(`${environment.base_URL}/api/jobseeker/user/${userID}/users_skills/delete/${skillID}`,  { headers }).pipe(
        switchMap((response: any) => {
           return of(response);
        })
    );
  }

}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../models/profile';
import { ExtraCurricular } from '../models/extra-curricular';

@Injectable({
  providedIn: 'root'
})
export class ExtraCurricularService {

  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
  ) {
    this.http = new HttpClient(httpBackend);
  }

  addExtraCurricularActivity(activity:ExtraCurricular ): Observable<any> {
    let formData = new FormData();

    formData.append('organization_name', activity.organization_name);
    formData.append('role', activity.role);
    formData.append('start_date', activity.start_date);
    formData.append('end_date', activity.end_date);
    formData.append('description', activity.description);
    formData.append('category', activity.category);
  
    
    const userID = localStorage.getItem('user-id'); 
    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
    });

    return this.http.post(`${environment.base_URL}/api/jobseeker/user/${userID}/extracurriculars/create`, formData, { headers }).pipe(
        switchMap((response: any) => {
          
          return of(response);
        })
    );
  }

  editExtraCurricularActivity(activity:ExtraCurricular, acitivityID:any): Observable<any> {
    let formData = new FormData();
  
    formData.append('_method', 'PUT');
    formData.append('organization_name', activity.organization_name);
    formData.append('role', activity.role);
    formData.append('start_date', activity.start_date);
    formData.append('end_date', activity.end_date);
    formData.append('description', activity.description);
    formData.append('category', activity.category);
  
   
    const userID = localStorage.getItem('user-id'); 
    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
    });

    return this.http.post(`${environment.base_URL}/api/jobseeker/user/${userID}/extracurriculars/update/${acitivityID}`, formData, { headers }).pipe(
        switchMap((response: any) => {
          
          return of(response);
        })
    );
  }

  removeExtraCurricularActivity( activityID:any): Observable<any> {

    let formData = new FormData();
    formData.append('_method', 'DELETE');
    
    
    const userID = localStorage.getItem('user-id'); 
    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
    });

    return this.http.delete(`${environment.base_URL}/api/jobseeker/user/${userID}/extracurriculars/delete/${activityID}`,  { headers }).pipe(
        switchMap((response: any) => {
          
          return of(response);
        })
    );
  }


}

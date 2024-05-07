import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../models/profile';
import { Education } from '../models/education';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  
  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
  ) {
    this.http = new HttpClient(httpBackend);
  }

  addEducation(education:Education): Observable<any> {
    let formData = new FormData();

    formData.append('title', education.title);
    formData.append('institution', education.institution);
    formData.append('year', education.year);
    formData.append('result', education.result);
    formData.append('grade_type', education.grade_type);
    formData.append('total_cgpa', education.total_cgpa);
    formData.append('letter_marks', education.letter_marks);
  
    const userID = localStorage.getItem('user-id'); // Retrieve the userID dynamically
    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + authToken
    });

    return this.http.post(`${environment.base_URL}/api/jobseeker/user/${userID}/education/create`, formData, { headers }).pipe(
        switchMap((response: any) => {
          
          return of(response);
        })
    );
  }

  editEducation(education:Education, educationID:any): Observable<any> {
    let formData = new FormData();
  
    formData.append('title', education.title);
    formData.append('institution', education.institution);
    formData.append('year', education.year);
    formData.append('result', education.result);
    formData.append('grade_type', education.grade_type);
    formData.append('total_cgpa', education.total_cgpa);
    formData.append('letter_marks', education.letter_marks);
    formData.append('_method', 'PUT');
  
    const userID = localStorage.getItem('user-id'); // Retrieve the userID dynamically
    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + authToken
    });

    return this.http.post(`${environment.base_URL}/api/jobseeker/user/${userID}/education/update/${educationID}`, formData,  { headers }).pipe(
        switchMap((response: any) => {
          
          return of(response);
        })
    );
  }

  removeEducation( educationID:any): Observable<any> {
    
    let formData = new FormData();

    formData.append('_method', 'DELETE');

   
    const userID = localStorage.getItem('user-id');
    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
    });

    return this.http.delete(`${environment.base_URL}/api/jobseeker/user/${userID}/education/delete/${educationID}`,  { headers }).pipe(
        switchMap((response: any) => {
          
          return of(response);
        })
    );
  }

}

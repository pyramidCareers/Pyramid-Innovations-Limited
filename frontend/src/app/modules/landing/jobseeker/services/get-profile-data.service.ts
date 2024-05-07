import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class GetProfileDataService {
  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
  ) {
    this.http = new HttpClient(httpBackend);
  }

  getProfileData(userID:any): Observable<any> {


    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + authToken
    });

    return this.http.get(`${environment.base_URL}/api/jobseeker/${userID}`, { headers }).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  downloadResume(userID: any): Observable<any> {

    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + authToken
    });

    return this.http.get(`${environment.base_URL}/api/jobseeker/${userID}/download`, { headers, responseType: 'blob' }).pipe(
      switchMap((response: any) => {
        const blob = new Blob([response], { type: 'application/pdf' });

        // Create a download link and trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = 'resume.pdf';
        downloadLink.click();

        return of(response);

      })
    );
  }

  getDashboardData(): Observable<any> {
    let formData = new FormData();

    const authToken = localStorage.getItem('auth-token');
    
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + authToken
    });

    return this.http.post(`${environment.base_URL}/api/jobseeker/dashboard`, formData, { headers }).pipe(
        switchMap((response: any) => {
           return of(response);
        })
    );
  }

 

}

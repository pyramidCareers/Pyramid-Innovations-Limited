import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AppliedJobService {
    constructor(private http: HttpClient, private router: Router) {}

    getJobList(currentPageNo): Observable<any> {

      let userID = localStorage.getItem('user-id');
      const authToken = localStorage.getItem('auth-token');

      const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authToken
      });

      return this.http.get(`${environment.base_URL}/api/jobapplication/user/${userID}?page=${currentPageNo}`).pipe(
          switchMap((response: any) => {
              return of(response);
          })
      );
    }

    getJobDetailsbyID(jobId: number): Observable<any> {
        return this.http.get(`${environment.base_URL}/api/job/${jobId}`).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    getCompletedCourses(userId:any): Observable<any> {
        let formData = new FormData();
        formData.append('user_id', userId);
      
        const userID = localStorage.getItem('user-id'); 
        const authToken = localStorage.getItem('auth-token');
    
        const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
        });
    
        return this.http.post(`${environment.base_URL}/api/pet/get-courses`, formData, { headers }).pipe(
            switchMap((response: any) => {
              
              return of(response);
            })
        );
    }

   

   
}

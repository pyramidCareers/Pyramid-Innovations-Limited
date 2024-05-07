import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteJobsService {

  constructor(private http: HttpClient, private router: Router) { }

  getFavJobList(currentPageNo): Observable<any> {

    let userID = localStorage.getItem('user-id');
    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
    });

    return this.http.get(`${environment.base_URL}/api/favoritejobs/${userID}?page=${currentPageNo}`).pipe(
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



}

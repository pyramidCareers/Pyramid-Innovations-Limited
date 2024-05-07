import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebinarService {

  constructor(private http: HttpClient, private httpBackend: HttpBackend) {
    this.http = new HttpClient(httpBackend);
  }

  getWebinarDetails(webinarId:any): Observable<any> {
    const authToken = localStorage.getItem('auth-token');
    const headers = new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + authToken,
    });

    return this.http.get(`${environment.base_URL}/api/get/webinar/${webinarId}`, { headers }).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
  }

  registerWebinar(userId: any, webinarId: any): Observable<any> {
    let formData = new FormData();
    formData.append('user_id', userId);
    formData.append('webinar_id', webinarId);

    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + authToken,
    });

    return this.http.post(`${environment.base_URL}/api/register/webinar`, formData, {headers}).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
  }

  getRegistrationStatus(userId: any, webinarId: any): Observable<any> {
    let formData = new FormData();
    formData.append('user_id', userId);
    formData.append('webinar_id', webinarId);

    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + authToken,
    });

    return this.http.post(`${environment.base_URL}/api/webinar/registration/status`, formData, {headers}).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
  }

  getWebinarJoiningInfo(webinarId:any, userId:any): Observable<any>{
      const authToken = localStorage.getItem('auth-token');
      const headers = new HttpHeaders({
          Accept: 'application/json',
          Authorization: 'Bearer ' + authToken,
      });

      return this.http.get(`${environment.base_URL}/api/zoom/webinar/${webinarId}/user/${userId}/join`, { headers }).pipe(
              switchMap((response: any) => {
                  return of(response);
              })
          );
  }

  getWebinarListByJobseeker(userId: any, reqBody:any, currentPageNo:any): Observable<any> {
    let formData = new FormData();
    
    formData.append('user_id', userId);
    if(reqBody.status)formData.append('status', reqBody.status);
   

    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + authToken,
    });

    return this.http.post(`${environment.base_URL}/api/get/registered/webinars/${userId}?page=${currentPageNo}`, formData, {headers}).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

}

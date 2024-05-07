import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorSessionService {

  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
  ) {
    this.http = new HttpClient(httpBackend);
  }



  getWebinars(currentPageNo:any): Observable<any> {
      const authToken = localStorage.getItem('auth-token');
      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + authToken
      });
    
      return this.http.get(`${environment.base_URL}/api/get/webinars?page=${currentPageNo}`, { headers }).pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
  }
  

  updateWebinar(reqBody:any): Observable<any> {
    
      const authToken = localStorage.getItem('auth-token');
      const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken,
          'Content-Type': 'application/x-www-form-urlencoded'
      });
      
      const formData = new URLSearchParams();
      
      if (reqBody.id) formData.set("id", reqBody.id);
      
      if (reqBody.approved) formData.set("approved", reqBody.approved);
      else formData.set("approved", "0");

      if (reqBody.title) formData.set("title", reqBody.title);
      if (reqBody.description) formData.set("description", reqBody.description);
      if (reqBody.start_time) formData.set("start_time", reqBody.start_time);
      if (reqBody.end_time) formData.set("end_time", reqBody.end_time);
      if (reqBody.date) formData.set("date", reqBody.date);
      
      if (reqBody.registration_fee) formData.set("registration_fee", reqBody.registration_fee);
      else formData.set("registration_fee", "0");
      
      return this.http.put(`${environment.base_URL}/api/update/webinar`, formData.toString(), { headers }).pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
    
  }

  getFilteredWebinars(currentPageNo:any, filter:any): Observable<any> {
    
        const authToken = localStorage.getItem('auth-token');
        const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
        });
        
        let formData = new FormData();
        formData.append('filter', filter);
        
        return this.http.post(`${environment.base_URL}/api/webinar/filter?page=${currentPageNo}`, formData, { headers }).pipe(
            switchMap((response: any) => {
              return of(response);
            })
        );
  }
}

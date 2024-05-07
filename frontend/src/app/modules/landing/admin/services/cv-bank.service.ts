import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { CvTemplate } from '../models/cv-template';
import { CLASS_VIDEO_BREAK } from '@syncfusion/ej2-angular-richtexteditor';


@Injectable({
  providedIn: 'root'
})

export class CvBankService {

    constructor(
      private http: HttpClient,
      private httpBackend: HttpBackend,
    ) {
      this.http = new HttpClient(httpBackend);
    }

    getAllCvBankReqsByAdmin(currentPageNo): Observable<any> {
     
      const authToken = localStorage.getItem('auth-token');
      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + authToken
      });

      return this.http.get(`${environment.base_URL}/api/cv/get-requests/?page=${currentPageNo}`, { headers }).pipe(
          switchMap((response: any) => {
            return of(response);
          })
      );
    }

    getCvBankReq(currentPageNo, empId): Observable<any> {
        const authToken = localStorage.getItem('auth-token');
        const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
        });
      
        return this.http.get(`${environment.base_URL}/api/cv/get-requests/${empId}?page=${currentPageNo}`, { headers }).pipe(
          switchMap((response: any) => {
            return of(response);
          })
        );
    }
    

    addCvBankReq(requestBody:any): Observable<any> {
      
          let formData = new FormData();
          formData.append("user_id", requestBody.user_id);
          formData.append("number_of_cv", requestBody.number_of_cv);
          
          requestBody.cvfilters.forEach((filter, index) => {
              formData.append(`cvfilters[${index}][filter_name]`, filter.filter_name);
              formData.append(`cvfilters[${index}][filter_value]`, filter.filter_value);
          });
      
          const userID = localStorage.getItem('user-id'); 
          const authToken = localStorage.getItem('auth-token');

          const headers = new HttpHeaders({
             'Accept': 'application/json',
             'Authorization': 'Bearer ' + authToken
          });

          return this.http.post(`${environment.base_URL}/api/cv/request`, formData, { headers }).pipe(
              switchMap((response: any) => {
                
                return of(response);
              })
          );
    }

    editCvBankReq(requestBody:any): Observable<any> {
      
      let formData = new FormData();
      formData.append("_method", "put");
      formData.append("id", requestBody.id);
      formData.append("user_id", requestBody.user_id);
      formData.append("number_of_cv", requestBody.number_of_cv);
      
      requestBody.cvfilters.forEach((filter, index) => {
          if(filter.id)formData.append(`cvfilters[${index}][id]`, filter.id);
          if(filter.request_id)formData.append(`cvfilters[${index}][request_id]`, filter.request_id);
          formData.append(`cvfilters[${index}][filter_name]`, filter.filter_name);
          formData.append(`cvfilters[${index}][filter_value]`, filter.filter_value);
      });
  
      const userID = localStorage.getItem('user-id'); 
      const authToken = localStorage.getItem('auth-token');

      const headers = new HttpHeaders({
         'Accept': 'application/json',
         'Authorization': 'Bearer ' + authToken
      });

      return this.http.post(`${environment.base_URL}/api/cv/update-filters`, formData, { headers }).pipe(
          switchMap((response: any) => {
            
            return of(response);
          })
      );
    }

    setApprovalStatCvBankReq(requestBody:any): Observable<any> {
          
          const userID = localStorage.getItem('user-id'); 
          const authToken = localStorage.getItem('auth-token');

          const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authToken
          });

          return this.http.put(`${environment.base_URL}/api/cv/update-request-status`, {
                id: requestBody.id,
                approved_by: requestBody.approved_by,
                status: requestBody.status
          }, { headers }).pipe(
              switchMap((response: any) => {
                    console.log(response);
                    return of(response);
              })
          );
    }



}

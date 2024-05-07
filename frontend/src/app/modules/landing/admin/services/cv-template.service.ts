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


export class CvTemplateService {

  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
  ) {
    this.http = new HttpClient(httpBackend);
  }


  getCvTemplatea(currentPageNo): Observable<any> {
    
    const userID = localStorage.getItem('user-id'); // Retrieve the userID dynamically
    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + authToken
    });

    return this.http.get(`${environment.base_URL}/api/admin/get-resume-template?page=${currentPageNo}`,  { headers }).pipe(
        switchMap((response: any) => {
          
          return of(response);
        })
    );
  }

  addCvTemplate(cv: CvTemplate): Observable<any> {
        let formData = new FormData();

        formData.append('link', cv.link);
        formData.append('name', cv.name);
        formData.append('tag', cv.tag);
        formData.append('description', cv.description);
    
      
        const userID = localStorage.getItem('user-id'); // Retrieve the userID dynamically
        const authToken = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
        });

        return this.http.post(`${environment.base_URL}/api/admin/upload-resume-template`, formData, { headers }).pipe(
            switchMap((response: any) => {
              
              return of(response);
            })
        );
  }


  editCvTemplate(cv: CvTemplate, cvID:any): Observable<any> {
    let formData = new FormData();

    formData.append('_method', 'PUT');
    formData.append('link', cv.link);
    formData.append('name', cv.name);
    formData.append('tag', cv.tag);
    formData.append('description', cv.description);

  
    const userID = localStorage.getItem('user-id'); // Retrieve the userID dynamically
    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + authToken
    });

    return this.http.post(`${environment.base_URL}/api/admin/update-resume-template/${cvID}`, formData, { headers }).pipe(
        switchMap((response: any) => {
          
          return of(response);
        })
    );
}

  removeCvTemplate( cvTemplateID:any): Observable<any> {
    
    let formData = new FormData();

    formData.append('_method', 'DELETE');

   
    const userID = localStorage.getItem('user-id');
    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
    });

    return this.http.delete(`${environment.base_URL}/api/admin/delete-resume-template/${cvTemplateID}`,  { headers }).pipe(
        switchMap((response: any) => {
          
          return of(response);
        })
    );
  }

}

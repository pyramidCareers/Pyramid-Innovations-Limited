import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../models/profile';
import { Certificate } from '../models/certificate';

@Injectable({
  providedIn: 'root'
})

export class CertificationService{

  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
  ) {
    this.http = new HttpClient(httpBackend);
  }

  addCertificate(cert:Certificate ): Observable<any> {
    let formData = new FormData();

    formData.append('certificate_name', cert.certificate_name);
    formData.append('issuing_organization', cert.issuing_organization);
    formData.append('issue_date', cert.issue_date);
    formData.append('expiration_date', cert.expiration_date);
    formData.append('credential_id', cert.credential_id);
    formData.append('credential_url', cert.credential_url);
  
    
    const userID = localStorage.getItem('user-id'); 
    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
    });

    return this.http.post(`${environment.base_URL}/api/jobseeker/user/${userID}/certification/create`, formData, { headers }).pipe(
        switchMap((response: any) => {
          
          return of(response);
        })
    );
  }

  editCertificate(cert:Certificate, certID:any): Observable<any> {
    let formData = new FormData();
  
    formData.append('_method', 'PUT');
    formData.append('certificate_name', cert.certificate_name);
    formData.append('issuing_organization', cert.issuing_organization);
    formData.append('issue_date', cert.issue_date);
    formData.append('expiration_date', cert.expiration_date);
    formData.append('credential_id', cert.credential_id);
    formData.append('credential_url', cert.credential_url);
  
   
    const userID = localStorage.getItem('user-id'); 
    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
    });

    return this.http.post(`${environment.base_URL}/api/jobseeker/user/${userID}/certification/update/${certID}`, formData, { headers }).pipe(
        switchMap((response: any) => {
          
          return of(response);
        })
    );
  }

  removeCertificate( certID:any): Observable<any> {

    let formData = new FormData();
    formData.append('_method', 'DELETE');
    
    
    const userID = localStorage.getItem('user-id'); 
    const authToken = localStorage.getItem('auth-token');

    const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
    });

    return this.http.delete(`${environment.base_URL}/api/jobseeker/user/${userID}/certification/delete/${certID}`,  { headers }).pipe(
        switchMap((response: any) => {
          
          return of(response);
        })
    );
  }


}

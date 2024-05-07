import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetPasswordResetLinkService {

  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
  ) {
    this.http = new HttpClient(httpBackend);
  }

  getPasswordResetLink(email:string): Observable<any> {
    let formData = new FormData();
  
    formData.append('email', email);
   
  
    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.post(`${environment.base_URL}/api/forgetpassword`, formData, { headers }).pipe(
      switchMap((response: any) => {
        
        return of(response);
      })
    );
  }
  
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { User } from '../models/user';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
  ) {
    this.http = new HttpClient(httpBackend);
  }

  register(user: User): Observable<any> {
    let formData = new FormData();
  
    formData.append('firstname', user.firstname);
    formData.append('lastname', user.lastname);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('password', user.password);
    formData.append('password_confirmation', user.password_confirmation);
    formData.append('user_type', user.user_type);
  
    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.post(`${environment.base_URL}/api/register`, formData, { headers }).pipe(
      switchMap((response: any) => {
        
        return of(response);
      })
    );
  }
  
}

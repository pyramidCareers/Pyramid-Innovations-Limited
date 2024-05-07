import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenService{

  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
  ) {
    this.http = new HttpClient(httpBackend);
  }

  verifyToken(token): Observable<any> {
      const headers = new HttpHeaders().set('Accept', 'application/json');

      return this.http.get(`${environment.base_URL}/api/resetpassword/${token}`, { headers }).pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
  }
  
}

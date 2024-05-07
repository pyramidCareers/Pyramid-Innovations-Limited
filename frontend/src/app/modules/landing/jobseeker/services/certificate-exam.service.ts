import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class CertificateExamService {

  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
  ) {
    this.http = new HttpClient(httpBackend);
  }

  getCourses(){
    
       
    let formData = new FormData();
    const cert_exam_cat_id:any =  environment.certified_exam_category_id;
  
    formData.append('wstoken', localStorage.getItem('moodle-token'));
    formData.append('wsfunction', 'core_course_get_courses_by_field');
    formData.append('moodlewsrestformat', 'json');
    formData.append('field', 'category');
    formData.append('value', cert_exam_cat_id);
 
   
    return this.http.post(`${environment.moodle_base_URL}/webservice/rest/server.php`, formData).pipe(
      switchMap((response: any) => { 
          return of(response);
      })
    );
  }
}

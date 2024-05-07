import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Course } from 'app/modules/landing/job-details/models/course';
import { GetTokenService } from 'app/modules/landing/job-details/services/get-token.service';


@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent {
  @Input() course: Course;

  @Output() newItemEvent = new EventEmitter<any>();

 

  constructor(private _getToken: GetTokenService, private _router: Router) {
      this.returnURL = window.location.href;
  }

  returnURL: string;


  gotoCourse(id: any) {
      const course_url =
          environment.moodle_base_URL + '/course/view.php?id=' + id;
      this._getToken
          .getToken(
              localStorage.getItem('user-email'),
              localStorage.getItem('moodle-token'),
              course_url,
              this.returnURL
          )
          .subscribe((res: any) => {
              const url = `${environment.moodle_base_URL}/auth/pyramid/callback.php?token=${res?.data?.jwtToken}`;
              window.open(url, '_blank');
          });
  }
}

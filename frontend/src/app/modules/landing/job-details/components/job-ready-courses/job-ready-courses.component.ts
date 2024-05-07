import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventData } from 'app/modules/landing/jobseeker/models/event-data';
import { EventService } from 'app/shared/services/event.service.service';
import { environment } from 'environments/environment';
import { Course } from '../../models/course';
import { GetTokenService } from '../../services/get-token.service';
import { DeletePetComponent } from '../delete-pet/delete-pet.component';
import { DeleteJobReadyCourseComponent } from '../delete-job-ready-course/delete-job-ready-course.component';

@Component({
  selector: 'app-job-ready-courses',
  templateUrl: './job-ready-courses.component.html',
  styleUrls: ['./job-ready-courses.component.scss']
})
export class JobReadyCoursesComponent {
  course_url: string;

  @Input() courses: any[];
  @Input() jobID: any;
  @Input() editAccess: any;

  isLoggedin: boolean;
  isJobseeker: boolean;

  constructor(
      private dialog: MatDialog,
      private _router: Router,
      private eventService: EventService,
      private _getToken: GetTokenService
  ) {
      this.returnURL = window.location.href;
  }
  returnURL: string;
  ngOnInit() {
     
      this.eventService.event$.subscribe((data: EventData) => {
          if (data.action === 'remove') {
              if (data.source === 'job-ready-course') {
                  const index = this.courses.findIndex(
                      (course) => course.id === data.obj.id
                  );
                  if (index != -1) {
                      this.courses.splice(index, 1);
                  }
              }
          }
      });

      if (localStorage.getItem('auth-token')) this.isLoggedin = true;
      else this.isLoggedin = false;

      if (localStorage.getItem('type-code') == environment.jobseeker_type_code)
          this.isJobseeker = true;
      else this.isJobseeker = false;
  }

  gotoCourse(id) {
      const course_url = environment.moodle_base_URL + '/course/view.php?id=' + id;
      this._getToken.getToken(
              localStorage.getItem('user-email'),
              localStorage.getItem('moodle-token'),
              course_url,
              this.returnURL
          ).subscribe((res: any) => {
              const url = `${environment.moodle_base_URL}/auth/pyramid/callback.php?token=${res?.data?.jwtToken}`;
              window.open(url, '_blank');
          });
  }

  deleteCourse(jobId:any, courseID:any) {
      localStorage.setItem('course-id', courseID);
      localStorage.setItem('job-id', jobId);
      this.dialog.open(DeleteJobReadyCourseComponent);
  }

}

import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Course } from 'app/modules/landing/job-details/models/course';
import { CertificateExamService } from 'app/modules/landing/jobseeker/services/certificate-exam.service';
import { environment } from 'environments/environment';

const PAGE_SIZE = 3;

@Component({
  selector: 'app-cert-exam',
  templateUrl: './cert-exam.component.html',
  styleUrls: ['./cert-exam.component.scss']
})
export class CertExamComponent {
  selectedCourse: string = '';
  searchText: string = '';
  loading: boolean = false;
  totalPages: number;
  currentPageCourses: Course[];  //array of courses for current page
  per_page: number = 6;
  prevBtnDisabled: boolean = false;
  nextBtnDisabled: boolean = false;
  currentPage: number = 1;
  courses: Course[] = [];
  addedCourses:Course[] = [];
  catId:any = environment.certified_exam_category_id;


  constructor(
      private certApi:  CertificateExamService,
      @Inject(DOCUMENT) private document: Document
  ) {}

 

  ngOnInit() {
      this.loading = true;
      this.document.body.scrollTop = 0;
      this.document.documentElement.scrollTop = 0;

    
      this.certApi.getCourses().subscribe((res: any) => {
          this.loading = false;
          this.courses = res?.courses;
      
          this.getCurrentPageCourses();
      });

  }



  getCurrentPageCourses() {
      let leftIndex: number = (this.currentPage - 1) * this.per_page;
      let rightIndex: number = leftIndex + this.per_page - 1;

      this.currentPageCourses = [];
      for (let indx = leftIndex; indx <= rightIndex && indx < this.courses.length; indx++) {
          if (this.courses[indx]?.summary.length > 180) {
              this.courses[indx].summary =
                  this.courses[indx].summary.substring(0, 180) + '...';
          }
          this.currentPageCourses.push(this.courses[indx]);
      }
     
      

      if (leftIndex == 0) this.prevBtnDisabled = true;
      else this.prevBtnDisabled = false;

      if (rightIndex + 1 >= this.courses.length) this.nextBtnDisabled = true;
      else this.nextBtnDisabled = false;
  }

  goPrev() {
      if (this.currentPage - 1 > 0) {
          this.currentPage--;
          this.getCurrentPageCourses();
      }
  }

  addCertExam(){
      const url:any = environment.moodle_base_URL + "/course/edit.php?category=" + this.catId;
      window.open(url, '_blank');
  }

  goNext() {
      let tmpPotentialPage = this.currentPage + 1;
      let leftIndex: number = (tmpPotentialPage - 1) * this.per_page;
      if (leftIndex < this.courses.length) {
          this.currentPage++;
          this.getCurrentPageCourses();
      }
  }

}

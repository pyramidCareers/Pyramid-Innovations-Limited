import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JobCard } from '../../models/job-card';


@Component({
  selector: 'app-card-job-circular',
  templateUrl: './card-job-circular.component.html',
  styleUrls: ['./card-job-circular.component.scss']
})
export class CardJobCircularComponent {

    @Input() jobCard:JobCard = {} as JobCard;
      
    constructor(private _router: Router) {}

    goToCreateNewJobPage() {
          this._router.navigate(['employer', 'jobs', 'new']);
    }

    displayJobDetails() {
          this._router.navigate(['jobs', this.jobCard.id]);
    }

    goToJobEditPage() {
          this._router.navigate(['employer', 'jobs', this.jobCard.id]);
    }

    goToApplicantsPage() {
          this._router.navigate(['employer', 'applicants', this.jobCard.id]);
    }
}

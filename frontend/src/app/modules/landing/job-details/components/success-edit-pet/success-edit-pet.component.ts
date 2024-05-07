import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-edit-pet',
  templateUrl: './success-edit-pet.component.html',
  styleUrls: ['./success-edit-pet.component.scss']
})
export class SuccessEditPetComponent {
  jobID:any;
  constructor(private _router:Router, private dialogRef: MatDialogRef<any>){}


  ngOnInit(){
          this.jobID = localStorage.getItem('job-id');
  }

  goTo(){
      this._router.navigate(['jobs', this.jobID]);
      this.dialogRef.close();
  }

  ngOnDestroy(){
    localStorage.removeItem('job-id');
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-create-pet',
  templateUrl: './success-create-pet.component.html',
  styleUrls: ['./success-create-pet.component.scss']
})
export class SuccessCreatePetComponent {

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

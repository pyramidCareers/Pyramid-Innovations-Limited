import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalErrorComponent } from '../modal-error/modal-error.component';

@Component({
  selector: 'app-modal-post-job',
  templateUrl: './modal-post-job.component.html',
  styleUrls: ['./modal-post-job.component.scss']
})
export class ModalPostJobComponent {
  
   
  constructor(private _router:Router, private dialogRef: MatDialogRef<ModalErrorComponent>) {}


  goTo(path:string)
  {
       this._router.navigate([path]);
       this.dialogRef.close();
  }    

}

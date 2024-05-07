import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent {

  constructor(private dialogRef: MatDialogRef<ModalErrorComponent>) {}


  cancelBtn(){
    this.dialogRef.close();
  }

 
}

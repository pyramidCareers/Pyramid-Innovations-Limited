import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-create-pet',
  templateUrl: './error-create-pet.component.html',
  styleUrls: ['./error-create-pet.component.scss']
})
export class ErrorCreatePetComponent {

   constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<any>){}

   cancelModal(){
      this.dialogRef.close();
   }
}

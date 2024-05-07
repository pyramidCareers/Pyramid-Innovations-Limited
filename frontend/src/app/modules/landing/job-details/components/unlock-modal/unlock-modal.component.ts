import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unlock-modal',
  templateUrl: './unlock-modal.component.html',
  styleUrls: ['./unlock-modal.component.scss']
})
export class UnlockModalComponent {
    loading:boolean = false;
    jobId:any;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private _router:Router,
                private dialogRef: MatDialogRef<any>,
    ) {
       this.jobId = data;
    }

    unlockJob(){
       this.cancelModal();
       this._router.navigate(['jobs', this.jobId, 'pet', 'create'], { queryParams: { unlock: '1' } });
    }

    cancelModal(){
      this.dialogRef.close();
    }
}

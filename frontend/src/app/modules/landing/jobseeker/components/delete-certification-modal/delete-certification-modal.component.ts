import { Component } from '@angular/core';
import { Certificate } from '../../models/certificate';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'app/shared/services/event.service.service';
import { CertificationService } from '../../services/certification.service';

@Component({
  selector: 'app-delete-certification-modal',
  templateUrl: './delete-certification-modal.component.html',
  styleUrls: ['./delete-certification-modal.component.scss']
})
export class DeleteCertificationModalComponent {
    certificate:Certificate = {} as Certificate;
    loading:boolean = false;

    constructor(
      private dialogRef: MatDialogRef<any>,
      private certificateApi: CertificationService,
      private eventService: EventService,
    ){}



    cancelModal(){
        this.dialogRef.close();
    }

 
    ngOnInit(){
        this.setVal();
    }

    setVal() {
      this.certificate.id = localStorage.getItem('item-id');
    }
 

    remove(){
        this.loading = true;
        this.certificateApi.removeCertificate(this.certificate.id).subscribe( (res)=>{
          this.loading = false;
          if(res.status && res.status==true){
            if(res.data ){
                this.eventService.jobSeekerData("certification", "remove", res.data); 
            }
          
          }
            this.dialogRef.close();
        });
    }


    ngOnDestroy(){
      this.unsetVal();
    }

    unsetVal(){
      localStorage.removeItem('item-id');
    }
}

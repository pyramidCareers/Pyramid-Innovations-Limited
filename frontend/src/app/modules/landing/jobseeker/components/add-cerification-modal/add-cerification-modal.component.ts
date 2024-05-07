import { Component } from '@angular/core';
import { CertificationService } from '../../services/certification.service';
import { EventService } from 'app/shared/services/event.service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Certificate } from '../../models/certificate';
import { EventData } from '../../models/event-data';

@Component({
  selector: 'app-add-cerification-modal',
  templateUrl: './add-cerification-modal.component.html',
  styleUrls: ['./add-cerification-modal.component.scss']
})
export class AddCerificationModalComponent {

  certificate:Certificate = {} as Certificate;
  loading:boolean = false;
  
  
 

  constructor(
      private certApi: CertificationService ,
      private eventService: EventService,
      private dialogRef: MatDialogRef<any>,
     
  ){}  



  ngOnInit(){
 
  }

    
  submit(){
      this.loading = true; 
      this.certApi.addCertificate(this.certificate).subscribe( (res:any)=>{
        this.loading = false;
        if(res.status && res.status==true){
            if(res.data){
              this.eventService.jobSeekerData("certification", "add", res.data); 
            }
        }
        this.dialogRef.close();
      })
      
    
  }


  isValidated(){
    if(!this.certificate.certificate_name || !this.certificate.issuing_organization || !this.certificate.issue_date || !this.certificate.expiration_date )return false;
    return true;
  }
  

}

import { Component } from '@angular/core';
import { Certificate } from '../../models/certificate';
import { CertificationService } from '../../services/certification.service';
import { EventService } from 'app/shared/services/event.service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-cerification-modal',
  templateUrl: './edit-cerification-modal.component.html',
  styleUrls: ['./edit-cerification-modal.component.scss']
})
export class EditCerificationModalComponent {
  certificate:Certificate = {} as Certificate;
  loading:boolean = false;

  id?:any;
  certificate_name?:any;
  issuing_organization?:any;
  issue_date?:any;
  expiration_date?:any;
  credential_id?:any = '';
  credential_url?:any = '';



  constructor(
    private certificateApi: CertificationService,
    private eventService: EventService,
    private dialogRef: MatDialogRef<any>
 ){}  

 ngOnInit(){
    this.setVal();
 }
 submit(){

    this.certificate.id = this.id;
    this.certificate.certificate_name = this.certificate_name;
    this.certificate.issuing_organization = this.issuing_organization;
    this.certificate.issue_date = this.issue_date;
    this.certificate.expiration_date = this.expiration_date;
    this.certificate.credential_id = this.credential_id;
    this.certificate.credential_url = this.credential_url;
    this.loading = true;

    this.certificateApi.editCertificate(this.certificate, this.certificate.id).subscribe( (res)=>{
        this.loading = false;
        if(res.status && res.status==true){
          if(res.data ){
              this.eventService.jobSeekerData("certification", "edit", res.data); 
          }
        
        }
          this.dialogRef.close();
    });

    this.dialogRef.close();
 }



  setVal() {
    this.id = localStorage.getItem('item-id');
    this.certificate_name = localStorage.getItem('certificate_name') || '';
    this.issuing_organization = localStorage.getItem('issuing_organization') || '';
    
    const issue_date = localStorage.getItem('issue_date');
    this.issue_date = issue_date ? new Date(issue_date).toISOString().substring(0, 10) : '';

    const expiration_date = localStorage.getItem('expiration_date');
    this.expiration_date = expiration_date ? new Date(expiration_date).toISOString().substring(0, 10) : '';

    if(localStorage.getItem('credential_id') )this.credential_id = localStorage.getItem('credential_id');
    if( !this.credential_id || this.credential_id == 'undefined' || this.credential_id == 'null' ){
         this.credential_id = '';
    }
    
    if(localStorage.getItem('credential_url'))this.credential_url = localStorage.getItem('credential_url');
    if( !this.credential_url || this.credential_url == 'undefined' || this.credential_url == 'null'){
         this.credential_url = '';
    }
    console.log(this.credential_url);
    
   
  }

isValidated(){
  if(!this.certificate_name || !this.issuing_organization || !this.issue_date || !this.expiration_date )return false;
  return true;
}



  ngOnDestroy(){
      this.unsetVal();
  }

  unsetVal(){
      localStorage.removeItem('item-id');
      localStorage.removeItem('certificate_name');
      localStorage.removeItem('issuing_organization');
      localStorage.removeItem('issue_date');
      localStorage.removeItem('expiration_date');
      localStorage.removeItem('credential_id');
      localStorage.removeItem('credential_url');
    }

}

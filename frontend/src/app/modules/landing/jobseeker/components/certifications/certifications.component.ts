import { Component, Input } from '@angular/core';
import { Certificate } from '../../models/certificate';
import { MatDialog } from '@angular/material/dialog';
import { AddCerificationModalComponent } from '../add-cerification-modal/add-cerification-modal.component';
import { EventData } from '../../models/event-data';
import { EventService } from 'app/shared/services/event.service.service';
import { EditCerificationModalComponent } from '../edit-cerification-modal/edit-cerification-modal.component';
import { DeleteCertificationModalComponent } from '../delete-certification-modal/delete-certification-modal.component';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss']
})

export class CertificationsComponent {
    @Input() isOwnProfile:boolean ;
    @Input() certificates:Certificate[];
   
    

    constructor(
         private dialog: MatDialog,
         private eventService: EventService,
    ){}

    ngOnInit(){
      this.eventService.event$.subscribe((data: EventData) => {
        if (data.action === 'add') {
            if (data.source === 'certification') this.certificates.push(data.obj);
           
        }

        if (data.action === 'edit') {
            let index: any;
          

            if (data.source === 'certification') {
                if (data.obj.id)
                    index = this.certificates.findIndex(
                        (cert) => cert.id === data.obj.id
                    );
                if (index != -1) {
                    this.certificates[index] = data.obj;
                }
            }
             
        }
        if (data.action === 'remove') {
            if (data.source === 'certification') {
                const index = this.certificates.findIndex(
                    (cert) => cert.id === data.obj.id
                );
                if (index != -1) {
                    this.certificates.splice(index, 1);
                }
            }
        }
      })
    }
   


    addCertification(){
      const dialog = this.dialog.open(AddCerificationModalComponent);
    }

    editCertification(cert: Certificate) {
        
        localStorage.setItem('item-id', cert.id);
        localStorage.setItem('certificate_name', cert.certificate_name);
        localStorage.setItem('issuing_organization', cert.issuing_organization);
        localStorage.setItem('issue_date', cert.issue_date);
        localStorage.setItem('expiration_date', cert.expiration_date);
        localStorage.setItem('credential_id', cert.credential_id);
        localStorage.setItem('credential_url', cert.credential_url);
        let dialogRef = this.dialog.open(EditCerificationModalComponent);
    }

    removeCertification(cert:Certificate){
        localStorage.setItem('item-id', cert.id);
        let dialogRef = this.dialog.open(DeleteCertificationModalComponent);
    }

    isUrlAvailable(cert:Certificate){
          
            if(!cert.credential_url){
              
                return false;
            }
            if(cert.credential_url ){
                if(cert.credential_url == 'undefined'){
                 
                    return false;
                }
            }
            return true;
    }

    fixUrl(url: any): any {
        if( url ){
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'http://' + url;
            }
            return url;
        }
    }
  


}

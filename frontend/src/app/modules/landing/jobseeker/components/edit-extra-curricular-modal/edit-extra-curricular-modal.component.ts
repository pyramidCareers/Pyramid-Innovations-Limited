import { Component } from '@angular/core';
import { ExtraCurricularService } from '../../services/extra-curricular.service';
import { EventService } from 'app/shared/services/event.service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ExtraCurricular } from '../../models/extra-curricular';

@Component({
  selector: 'app-edit-extra-curricular-modal',
  templateUrl: './edit-extra-curricular-modal.component.html',
  styleUrls: ['./edit-extra-curricular-modal.component.scss']
})
export class EditExtraCurricularModalComponent {

  extracurricular: ExtraCurricular = {} as ExtraCurricular;

  id?:any;
  organization_name?:string;
  role?:string;
  category?:string;
  start_date?:string;
  end_date?:string;
  description?:string;
  loading:boolean = false;



  constructor(
    private activityApi: ExtraCurricularService,
    private eventService: EventService,
    private dialogRef: MatDialogRef<any>
 ){}  

 ngOnInit(){
    this.setVal();
 }
 edit(){

    this.extracurricular.id = this.id;
    this.extracurricular.organization_name = this.organization_name;
    this.extracurricular.role = this.role
    this.extracurricular.category = this.category;
    this.extracurricular.start_date = this.start_date;
    this.extracurricular.end_date = this.end_date;
    this.extracurricular.description = this.description;
    this.loading = true;
   
    this.activityApi.editExtraCurricularActivity(this.extracurricular, this.extracurricular.id).subscribe( (res)=>{
      this.loading = false;
      if(res.status && res.status==true){
        if(res.data ){
            this.eventService.jobSeekerData("extracurricular", "edit", res.data); 
        }
      
      }
        this.dialogRef.close();
    });

    this.dialogRef.close();
 }



setVal() {
    this.id = localStorage.getItem('item-id');
    this.organization_name = localStorage.getItem('organization_name') || '';
    
    this.role = localStorage.getItem('role') || '';
    if(this.role == 'null' || this.role == 'undefined')this.role = '';
    
    this.category = localStorage.getItem('category') || '';
    if(this.category == 'null' || this.category == 'undefined')this.category = '';
    
    const start_date = localStorage.getItem('start_date');
    this.start_date = start_date ? new Date(start_date).toISOString().substring(0, 10) : '';

    const end_date = localStorage.getItem('end_date');
    this.end_date = end_date ? new Date(end_date).toISOString().substring(0, 10) : '';

    this.description = localStorage.getItem('description') || '';
    if(this.description == 'null' || this.description == 'undefined')this.description = '';

}





  ngOnDestroy(){
      this.unsetVal();
  }

  unsetVal(){
      localStorage.removeItem('item-id');
      localStorage.removeItem('organization_name');
      localStorage.removeItem('role');
      localStorage.removeItem('category');
      localStorage.removeItem('start_date');
      localStorage.removeItem('end_date');
      localStorage.removeItem('description');
    }

    isValidated(){
      if(!this.organization_name || !this.start_date || !this.end_date )return false;
      return true;
    }


}

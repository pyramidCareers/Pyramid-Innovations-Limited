import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PreEmploymentTestService } from 'app/modules/landing/jobs/services/pre-employment-test.service';
import { EventService } from 'app/shared/services/event.service.service';

@Component({
  selector: 'app-delete-pet',
  templateUrl: './delete-pet.component.html',
  styleUrls: ['./delete-pet.component.scss']
})
export class DeletePetComponent {

  loading:boolean = false;
  courseID:any;

  constructor(
       private dialogRef: MatDialogRef<any>,
       private petAPI:  PreEmploymentTestService,
       private eventService: EventService,
  ){}

  ngOnInit(){
    this.courseID = localStorage.getItem('course-id');
  }

  ngOnDestroy(){
    localStorage.removeItem('course-id');
  }

  remove(){
       this.petAPI.deletePET(this.courseID).subscribe( (res:any)=>{
          if(res.status && res.status==true){
            this.eventService.petData("pet", "remove", res.data); 
          }
          
          this.cancelModal();
       })
  }


  cancelModal(){
      this.dialogRef.close();
  }

}

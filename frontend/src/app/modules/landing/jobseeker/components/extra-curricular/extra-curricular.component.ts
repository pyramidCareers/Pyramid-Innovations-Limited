import { Component, Input } from '@angular/core';
import { ExtraCurricular } from '../../models/extra-curricular';
import { MatDialog } from '@angular/material/dialog';
import { EventData } from '../../models/event-data';
import { EventService } from 'app/shared/services/event.service.service';
import { AddExtraCurricularModalComponent } from '../add-extra-curricular-modal/add-extra-curricular-modal.component';
import { EditExtraCurricularModalComponent } from '../edit-extra-curricular-modal/edit-extra-curricular-modal.component';
import { RemoveExtraCurricularModalComponent } from '../remove-extra-curricular-modal/remove-extra-curricular-modal.component';

@Component({
  selector: 'app-extra-curricular',
  templateUrl: './extra-curricular.component.html',
  styleUrls: ['./extra-curricular.component.scss']
})
export class ExtraCurricularComponent {

    @Input() isOwnProfile:boolean;
    @Input() extraCurriCularActivities:  ExtraCurricular[] = [];


    constructor(
      private dialog: MatDialog,
      private eventService: EventService,
    ){}

    ngOnInit(){
      this.eventService.event$.subscribe((data: EventData) => {
        if (data.action === 'add') {
            if (data.source === 'extracurricular') this.extraCurriCularActivities.push(data.obj);
           
        }

        if (data.action === 'edit') {
            let index: any;
          

            if (data.source === 'extracurricular') {
                if (data.obj.id)
                    index = this.extraCurriCularActivities.findIndex(
                        (act) => act.id === data.obj.id
                    );
                if (index != -1) {
                    this.extraCurriCularActivities[index] = data.obj;
                }
            }
             
        }
        if (data.action === 'remove') {
            if (data.source === 'extracurricular') {
                const index = this.extraCurriCularActivities.findIndex(
                    (act) => act.id === data.obj.id
                );
                if (index != -1) {
                    this.extraCurriCularActivities.splice(index, 1);
                }
            }
        }
      })
    }


    addActivity(){
       const dialog = this.dialog.open( AddExtraCurricularModalComponent );
    }

    editExtraCurricularActivity(activity:ExtraCurricular){
        localStorage.setItem('item-id', activity.id);
        localStorage.setItem('organization_name', activity.organization_name);
        localStorage.setItem('role', activity.role);
        localStorage.setItem('category',  activity.category);
        localStorage.setItem('start_date', activity.start_date);
        localStorage.setItem('end_date', activity.end_date);
        localStorage.setItem('description', activity.description);
        let dialogRef = this.dialog.open(EditExtraCurricularModalComponent);
    }

    removeExtraCurricular(activity:ExtraCurricular){
      localStorage.setItem('item-id', activity.id);
      let dialogRef = this.dialog.open( RemoveExtraCurricularModalComponent);
    }

    
}

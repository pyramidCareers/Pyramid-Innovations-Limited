import { Component } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-mentor',
    templateUrl: './mentor.component.html',
    styleUrls: ['./mentor.component.scss'],
})
export class MentorComponent {
    isSideBarVisible: boolean = false;

    ngOnInit() {
        if (
            localStorage.getItem('type-code') == environment.mentor_type_code ||
            localStorage.getItem('type-code') ==
                environment.jobseeker_type_code ||
            localStorage.getItem('type-code') == environment.admin_type_code
        )
            this.isSideBarVisible = true;
        else this.isSideBarVisible = false;
    }
}

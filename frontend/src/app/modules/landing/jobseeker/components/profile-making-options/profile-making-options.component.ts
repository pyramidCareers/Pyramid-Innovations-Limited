import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-making-options',
  templateUrl: './profile-making-options.component.html',
  styleUrls: ['./profile-making-options.component.scss']
})
export class ProfileMakingOptionsComponent {

     firstName:string = localStorage.getItem('firstname');

    constructor(
      private _router:Router
    ){}  

    goTo(path:string){
       this._router.navigate([path]);
    }
}

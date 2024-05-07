import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from './event.service.service';

@Injectable({
    providedIn: 'root',
})
export class LogoutService {
    constructor(private _router: Router, private eventService: EventService) {}

    logout() {
        localStorage.clear();
        this.eventService.triggerEvent(0);
        this._router.navigate(['user/login']);
    }
}

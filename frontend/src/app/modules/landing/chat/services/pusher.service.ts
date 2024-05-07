import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
declare const Pusher: any;

@Injectable({
    providedIn: 'root',
})
export class PusherService {
    pusher: any;
    constructor() {
        const authToken = localStorage.getItem('auth-token');

        if (!authToken) {
            throw new Error('authToken not found in localStorage');
        }

        this.pusher = new Pusher(environment.pusher_app_key, {
            cluster: environment.pusher_app_cluster,
            encrypted: true,
            authEndpoint: `${environment.base_URL}/chatify/api/chat/auth`,
            auth: {
                headers: {
                    Authorization: 'Bearer ' + authToken,
                },
            },
        });
    }
}

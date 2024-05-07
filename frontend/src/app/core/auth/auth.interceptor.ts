import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { LogoutService } from 'app/shared/services/logout.service';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _logoutService: LogoutService
    ) {}

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Clone the request object
        let newReq = req.clone();

        // Request
        //
        // If the access token didn't expire, add the Authorization header.
        // We won't add the Authorization header if the access token expired.
        // This will force the server to return a "401 Unauthorized" response
        // for the protected API routes which our response interceptor will
        // catch and delete the access token from the local storage while logging
        // the user out from the app.
        const authtoken = localStorage.getItem('auth-token');
        if (authtoken) {
            const moodleURL = '/webservice/rest';
            if (req.url.search(moodleURL) === -1) {
                newReq = req.clone({
                    headers: req.headers.set(
                        'Authorization',
                        'Bearer ' + authtoken
                    ),
                });
            }
        }

        // Response
        return next.handle(newReq).pipe(
            catchError((error) => {
                // Catch "401 Unauthorized" responses
                if (
                    error instanceof HttpErrorResponse &&
                    error.status === 401
                ) {
                    // Sign out
                    // this._logoutService.logout();
                    // Reload the app
                    // location.reload();
                }

                return throwError(error);
            })
        );
    }
}

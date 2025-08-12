import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthenticationService } from '@services/authentication.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const authenticationService = inject(AuthenticationService);

    return next(req).pipe(
        catchError((err) => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                authenticationService.logout();
                location.reload();
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        })
    );
};

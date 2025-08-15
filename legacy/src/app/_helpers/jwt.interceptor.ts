import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const authenticationService = inject(AuthenticationService);

    // add authorization header with jwt token if available
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser.token}`,
            },
        });
    }

    return next(req);
};

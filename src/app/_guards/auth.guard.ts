import { Injectable } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(private authenticationService: AuthenticationService) {}

    canActivate() {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.authenticationService.redirectToLoginPortal();
        return false;
    }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/_services';
import { routePaths } from '@app/app.routing';

@Injectable({
    providedIn: 'root',
})
export class FinishedRegistrationGuard implements CanActivate {
    constructor(private router: Router, private authenticationService: AuthenticationService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const currentUser = this.authenticationService.currentUserValue;

        // User not logged in or user logged and with registration finished
        if (!currentUser || (currentUser && currentUser.hasFinishedRegistration)) {
            return true;
        }

        // User logged in and registration not finished, so redirect to register
        this.router.navigate([`/${routePaths.customer.children.userProfile.path}`], {
            queryParams: { returnUrl: state.url },
        });
        return false;
    }
}

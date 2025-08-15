import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService, hasRoles } from '@app/_services';
import { routePaths } from '@app/app.routing';
import { EUserRole } from '@enums/user.enum';

@Injectable({
    providedIn: 'root',
})
export class FinishedRegistrationGuard {
    constructor(private router: Router, private authenticationService: AuthenticationService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.hasUserFinishedRegistrationCheck(route, state);
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.hasUserFinishedRegistrationCheck(route, state);
    }

    private hasUserFinishedRegistrationCheck(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = this.authenticationService.currentUserValue;

        // User not logged in or user logged and with registration finished
        if (!currentUser || (currentUser && currentUser.hasFinishedRegistration)) {
            return true;
        }

        // If user is not a customer, then allow access always
        if (!hasRoles(currentUser.roles, [EUserRole.CUSTOMER])) {
            return true;
        }

        // User logged in and registration not finished, so redirect to register
        this.router.navigate([`/${routePaths.customer.children.userProfile.path}`], {
            queryParams: { returnUrl: state.url },
        });
        return false;
    }
}

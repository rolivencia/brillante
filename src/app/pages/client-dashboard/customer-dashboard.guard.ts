import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EUserRole } from '@enums/user.enum';
import { AuthenticationService, hasRoles } from '@services/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class CustomerDashboardGuard {
    constructor(private authService: AuthenticationService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const userRoles = this.authService.currentUserValue.roles;
        const allowedRoles = [EUserRole.ADMIN, EUserRole.OWNER, EUserRole.COUNTER_CLERK];
        return hasRoles(userRoles, allowedRoles);
    }
}

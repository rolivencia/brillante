import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService, hasRoles } from '@app/_services';
import { EUser } from '@app/_enums/user.enum';

@Injectable({
    providedIn: 'root',
})
export class CustomerDashboardGuard implements CanActivate {
    constructor(private authService: AuthenticationService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const userRoles = this.authService.currentUserValue.roles;
        const allowedRoles = [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK];
        return hasRoles(userRoles, allowedRoles);
    }
}

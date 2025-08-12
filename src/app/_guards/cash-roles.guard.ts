import { inject, Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService, hasRoles } from '@services/authentication.service';
import { EUserRole } from '@enums/user.enum';

@Injectable({
    providedIn: 'root',
})
export class CashRolesGuard {
    constructor() {}
    private authService = inject(AuthenticationService);
    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const userRoles = this.authService.currentUserValue.roles;
        const allowedRoles = [EUserRole.ADMIN, EUserRole.OWNER, EUserRole.COUNTER_CLERK, EUserRole.EMPLOYEE];
        return hasRoles(userRoles, allowedRoles);
    }
}

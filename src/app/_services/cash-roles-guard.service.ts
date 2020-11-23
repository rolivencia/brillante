import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '@app/_services/user.service';
import { AuthenticationService } from '@app/_services/authentication.service';
import { EUser } from '@app/_enums/user.enum';

@Injectable({
    providedIn: 'root',
})
export class CashRolesGuard implements CanActivate {
    constructor(private authService: AuthenticationService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return (
            this.authService.currentUserValue.roles
                .map((role) => role.id)
                .filter((roleId) => [EUser.ADMIN, EUser.OWNER].includes(roleId)).length > 0
        );
    }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';
import { EUserRole } from '@enums/user.enum';
import { AuthenticationService, hasRoles } from '@services/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class ReportsGuard implements CanActivate {
    constructor(private authenticationService: AuthenticationService, private toastrService: ToastrService) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authenticationService.currentUser.pipe(
            switchMap((user) => of(hasRoles(user.roles, [EUserRole.ADMIN, EUserRole.OWNER, EUserRole.ACCOUNTANT]))),
            tap((value) => {
                if (value === false) {
                    this.toastrService.error('Acceso no autorizado. Se requieren permisos de administrador.');
                }
            })
        );
    }
}

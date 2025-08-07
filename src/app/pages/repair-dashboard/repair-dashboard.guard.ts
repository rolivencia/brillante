import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService, hasRoles } from '@services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';
import { EUserRole } from '@enums/user.enum';

@Injectable({
    providedIn: 'root',
})
export class RepairDashboardGuard implements CanActivate {
    constructor(private authenticationService: AuthenticationService, private toastrService: ToastrService) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authenticationService.currentUser.pipe(
            switchMap((user) => of(!hasRoles(user.roles, [EUserRole.ACCOUNTANT]))),
            tap((value) => {
                if (value === false) {
                    this.toastrService.error(
                        'Acceso no autorizado. Se requiere permisos de administrador, dueño o encargado de local.'
                    );
                }
            })
        );
    }
}

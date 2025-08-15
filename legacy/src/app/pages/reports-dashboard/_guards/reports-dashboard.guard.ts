import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService, hasRoles } from '@services/authentication.service';
import { EUserRole } from '@enums/user.enum';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ReportsDashboardGuard {
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

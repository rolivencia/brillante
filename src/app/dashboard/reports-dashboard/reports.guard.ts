import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService, hasRoles } from '@app/_services';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';
import { EUser } from '@app/_enums/user.enum';

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
            switchMap((user) => of(hasRoles(user.roles, [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK]))),
            tap((value) => {
                if (value === false) {
                    this.toastrService.error('Acceso no autorizado. Se requieren permisos de administrador.');
                }
            })
        );
    }
}

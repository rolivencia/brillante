import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EUser } from '@enums/user.enum';
import { switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService, hasRoles } from '@services/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class AppSettingsGuard implements CanActivate {
    constructor(private authenticationService: AuthenticationService, private toastrService: ToastrService) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authenticationService.currentUser.pipe(
            switchMap((user) => of(hasRoles(user.roles, [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK]))),
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

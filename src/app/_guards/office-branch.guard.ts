import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OfficeBranchService } from '@app/_services/office-branch.service';
import { switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class OfficeBranchGuard implements CanActivate {
    constructor(private officeBranchService: OfficeBranchService, private toastrService: ToastrService) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.officeBranchService.current.pipe(
            switchMap((branch) => of(branch !== null)),
            tap((value) => {
                if (value === false) {
                    this.toastrService.error('Por favor asigne una sucursal para poder acceder al módulo.');
                }
            })
        );
    }
}

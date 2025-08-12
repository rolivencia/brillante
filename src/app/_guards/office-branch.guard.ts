import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OfficeBranchService } from '@services/office-branch.service';
import { switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class OfficeBranchGuard {
    constructor(private officeBranchService: OfficeBranchService, private toastrService: ToastrService) {}
    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
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
